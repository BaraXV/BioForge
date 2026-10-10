"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForge } from "@/store/forge/useForge";
import type { Snippet } from "@/lib/forge/vault";
import { GitCompare, Copy as CopyIcon } from "lucide-react";
import { useMemo, useState } from "react";

interface CompareSnippetsDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** The first snippet to compare. If null, a picker is shown. */
  snippetAId: string | null;
  /** Optional preselected second snippet (e.g. via clicking Compare on a row). */
  snippetBId?: string | null;
}

/**
 * A simplified line-by-line diff between two snippets' HTML.
 *
 * Lines are aligned via longest-common-subsequence so unchanged lines appear
 * side by side. Non-matching lines are tagged:
 *   - "removed" — line only in A (red)
 *   - "added"   — line only in B (green)
 *   - "changed" — paired non-matching lines (yellow)
 *
 * This is intentionally a small, readable diff — not a full Myers/myers-diff.
 */
export interface DiffRow {
  kind: "equal" | "removed" | "added" | "changed";
  a: string | null;
  b: string | null;
}

function computeSideBySideDiff(a: string, b: string): DiffRow[] {
  const aLines = a.split("\n");
  const bLines = b.split("\n");
  const n = aLines.length;
  const m = bLines.length;

  // Build the LCS length table.
  // dp[i][j] = LCS length of aLines[i..] and bLines[j..]
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array<number>(m + 1).fill(0),
  );
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (aLines[i] === bLines[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  // Walk forward to produce the aligned rows.
  const rows: DiffRow[] = [];
  let i = 0;
  let j = 0;
  // Pending "removed" line waiting to be paired with an "added" line so we
  // can render it as "changed" instead of two separate rows.
  let pendingRemoved: string | null = null;
  while (i < n && j < m) {
    if (aLines[i] === bLines[j]) {
      if (pendingRemoved !== null) {
        rows.push({ kind: "removed", a: pendingRemoved, b: null });
        pendingRemoved = null;
      }
      rows.push({ kind: "equal", a: aLines[i], b: bLines[j] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      // Consume from A — either pair with a pending add or stash as removed.
      if (pendingRemoved !== null) {
        rows.push({ kind: "removed", a: pendingRemoved, b: null });
      }
      pendingRemoved = aLines[i];
      i++;
    } else {
      // Consume from B.
      if (pendingRemoved !== null) {
        rows.push({ kind: "changed", a: pendingRemoved, b: bLines[j] });
        pendingRemoved = null;
      } else {
        rows.push({ kind: "added", a: null, b: bLines[j] });
      }
      j++;
    }
  }
  // Flush any trailing pending removed line.
  if (pendingRemoved !== null) {
    rows.push({ kind: "removed", a: pendingRemoved, b: null });
  }
  while (i < n) {
    rows.push({ kind: "removed", a: aLines[i], b: null });
    i++;
  }
  while (j < m) {
    rows.push({ kind: "added", a: null, b: bLines[j] });
    j++;
  }
  return rows;
}

/** Counts of each diff kind, for the summary header. */
function summarize(rows: DiffRow[]) {
  let equal = 0;
  let added = 0;
  let removed = 0;
  let changed = 0;
  for (const r of rows) {
    if (r.kind === "equal") equal++;
    else if (r.kind === "added") added++;
    else if (r.kind === "removed") removed++;
    else changed++;
  }
  return { equal, added, removed, changed };
}

export default function CompareSnippetsDialog({
  open,
  onOpenChange,
  snippetAId,
  snippetBId: initialBId,
}: CompareSnippetsDialogProps) {
  const snippets = useForge((s) => s.snippets);
  const toast = useForge((s) => s.toast);

  // Initialize from props. The parent conditionally mounts this dialog
  // (`{compareAId && <CompareSnippetsDialog .../>}`) so the component remounts
  // fresh each time Compare is clicked — we get a clean state without a
  // reset-in-effect.
  const [pickB, setPickB] = useState<boolean>(initialBId ? false : true);
  const [bId, setBId] = useState<string | null>(initialBId ?? null);

  const snippetA: Snippet | null = useMemo(
    () => snippets.find((s) => s.id === snippetAId) ?? null,
    [snippets, snippetAId],
  );
  const snippetB: Snippet | null = useMemo(
    () => snippets.find((s) => s.id === bId) ?? null,
    [snippets, bId],
  );

  const diff = useMemo<DiffRow[]>(() => {
    if (!snippetA || !snippetB) return [];
    return computeSideBySideDiff(snippetA.html, snippetB.html);
  }, [snippetA, snippetB]);

  const summary = useMemo(() => summarize(diff), [diff]);

  const handleCopyMerged = async () => {
    if (!snippetB) return;
    try {
      await navigator.clipboard.writeText(snippetB.html);
      toast(`Copied "${snippetB.name}" (${snippetB.html.length.toLocaleString()} ch).`, "ok");
    } catch {
      toast("Clipboard write failed — copy manually.", "error");
    }
  };

  const handleClose = (o: boolean) => {
    if (!o) {
      setPickB(true);
      setBId(null);
    }
    onOpenChange(o);
  };

  // ---------- Render: snippet-B picker ----------
  if (!snippetA) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent
          className="max-w-xl"
          style={{
            background: "var(--forge-panel)",
            color: "var(--forge-text)",
            border: "1px solid var(--forge-edge)",
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: "var(--forge-accent2)" }}>
              <GitCompare size={16} style={{ display: "inline", marginRight: 6 }} />
              Compare snippets
            </DialogTitle>
          </DialogHeader>
          <p style={{ color: "var(--forge-dim)", fontSize: 12 }}>
            No base snippet selected. Close and click the Compare button on a snippet row first.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleClose(false)} type="button">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (pickB || !snippetB) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent
          className="max-w-xl"
          style={{
            background: "var(--forge-panel)",
            color: "var(--forge-text)",
            border: "1px solid var(--forge-edge)",
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: "var(--forge-accent2)" }}>
              <GitCompare size={16} style={{ display: "inline", marginRight: 6 }} />
              Compare — pick second snippet
            </DialogTitle>
          </DialogHeader>
          <p style={{ color: "var(--forge-dim)", fontSize: 12, margin: 0 }}>
            Base: <b style={{ color: "var(--forge-gold)" }}>{snippetA.name}</b> ({snippetA.html.length.toLocaleString()} ch). Pick a snippet to compare it against:
          </p>
          <ScrollArea
            className="max-h-[50vh] rounded-md"
            style={{
              background: "var(--forge-panel2)",
              border: "1px solid var(--forge-edge)",
            }}
          >
            <div style={{ padding: 6 }}>
              {snippets
                .filter((s) => s.id !== snippetA.id)
                .map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className="forge-compare-pick"
                    onClick={() => {
                      setBId(s.id);
                      setPickB(false);
                    }}
                  >
                    <span className="forge-compare-pick-name">{s.name}</span>
                    <span className="forge-compare-pick-meta">
                      {s.html.length.toLocaleString()} ch
                    </span>
                  </button>
                ))}
              {snippets.filter((s) => s.id !== snippetA.id).length === 0 && (
                <div style={{ padding: 16, textAlign: "center", color: "var(--forge-dim)", fontSize: 12 }}>
                  No other snippets in the vault. Create or duplicate one first.
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleClose(false)} type="button">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // ---------- Render: side-by-side diff ----------
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-5xl"
        style={{
          background: "var(--forge-panel)",
          color: "var(--forge-text)",
          border: "1px solid var(--forge-edge)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-2"
            style={{ color: "var(--forge-accent2)" }}
          >
            <GitCompare size={16} /> Compare snippets
          </DialogTitle>
        </DialogHeader>
        <div className="forge-compare-headnames">
          <div className="forge-compare-name-a">
            <span className="forge-compare-tag">A</span>
            <span className="forge-compare-label" title={snippetA.name}>{snippetA.name}</span>
            <span className="forge-compare-ch">{snippetA.html.length.toLocaleString()} ch</span>
          </div>
          <div className="forge-compare-name-b">
            <span className="forge-compare-tag b">B</span>
            <span className="forge-compare-label" title={snippetB.name}>{snippetB.name}</span>
            <span className="forge-compare-ch">{snippetB.html.length.toLocaleString()} ch</span>
          </div>
        </div>
        <div className="forge-compare-summary">
          <span className="forge-compare-pill equal">{summary.equal} same</span>
          <span className="forge-compare-pill added">+{summary.added} added</span>
          <span className="forge-compare-pill removed">−{summary.removed} removed</span>
          <span className="forge-compare-pill changed">~{summary.changed} changed</span>
          <button
            type="button"
            className="forge-btn ghost"
            style={{ marginLeft: "auto", padding: "2px 8px", fontSize: 11 }}
            onClick={() => setPickB(true)}
            title="Pick a different snippet B"
          >
            Swap B…
          </button>
        </div>
        <ScrollArea
          className="max-h-[55vh] rounded-md"
          style={{
            background: "var(--forge-panel2)",
            border: "1px solid var(--forge-edge)",
          }}
        >
          <table className="forge-compare-table">
            <tbody>
              {diff.map((row, idx) => (
                <tr key={idx} className={`forge-compare-row kind-${row.kind}`}>
                  <td className="forge-compare-cell a">
                    <span className="forge-compare-gutter">
                      {row.a !== null ? (row.kind === "removed" ? "−" : row.kind === "changed" ? "~" : " ") : ""}
                    </span>
                    <span className="forge-compare-line">{row.a ?? ""}</span>
                  </td>
                  <td className="forge-compare-cell b">
                    <span className="forge-compare-gutter">
                      {row.b !== null ? (row.kind === "added" ? "+" : row.kind === "changed" ? "~" : " ") : ""}
                    </span>
                    <span className="forge-compare-line">{row.b ?? ""}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
        <DialogFooter style={{ flexWrap: "wrap", gap: 8 }}>
          <Button
            onClick={handleCopyMerged}
            type="button"
            variant="outline"
            style={{
              background: "transparent",
              borderColor: "var(--forge-edge)",
              color: "var(--forge-ok)",
            }}
          >
            <CopyIcon size={14} /> Copy merged (B)
          </Button>
          <Button onClick={() => handleClose(false)} type="button" variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
