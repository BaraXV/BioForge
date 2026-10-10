"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Copy, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { useForge } from "@/store/forge/useForge";
import {
  loadPublishHistory,
  clearPublishHistory,
  type PublishHistoryEntry,
} from "@/lib/forge/publishHistory";

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

/** Compact relative time: "5s ago" / "3m ago" / "2h ago" / "4d ago". */
function relTime(ts: number, now: number): string {
  const diff = Math.max(0, Math.floor((now - ts) / 1000));
  if (diff < 5) return "just now";
  if (diff < 60) return `${diff}s ago`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

/** Show the target URL trimmed to a reasonable width. */
function trimUrl(url: string, max = 64): string {
  if (url.length <= max) return url;
  return url.slice(0, max - 1) + "…";
}

export default function PublishDialog({ open, onOpenChange }: PublishDialogProps) {
  const toast = useForge((s) => s.toast);
  // `bump` is incremented on open / clear / copy to re-read localStorage
  // during render via useMemo — avoids the set-state-in-effect pattern.
  const [bump, setBump] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  // Re-read localStorage whenever the dialog opens or after a local mutation.
  // useMemo is recomputed on `open`/`bump` change, giving us a fresh snapshot
  // without a setState-in-effect.
  const entries = useMemo<PublishHistoryEntry[]>(
    () => (open ? loadPublishHistory() : []),
    [open, bump],
  );

  // Tick once per second while open so the relative timestamps stay fresh.
  // setState lives inside the interval callback — not in the effect body —
  // so the react-hooks/set-state-in-effect rule is satisfied.
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [open]);

  const handleClear = useCallback(() => {
    if (entries.length === 0) return;
    if (!window.confirm("Clear the entire publish history log?")) return;
    clearPublishHistory();
    setBump((b) => b + 1);
    toast("Publish history cleared.", "ok");
  }, [entries.length, toast]);

  const handleCopy = useCallback(
    async (url: string) => {
      try {
        await navigator.clipboard.writeText(url);
        toast("Target URL copied.", "ok");
      } catch {
        // Fallback for non-secure contexts
        const ta = document.createElement("textarea");
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          toast("Target URL copied.", "ok");
        } catch {
          toast("Copy failed — select the URL manually.", "error");
        }
        ta.remove();
      }
    },
    [toast],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl"
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
            <History size={16} /> Publish History
            <span className="forge-history-count" aria-hidden>
              {entries.length}
            </span>
          </DialogTitle>
        </DialogHeader>

        {entries.length === 0 ? (
          <p
            style={{
              color: "var(--forge-dim)",
              fontSize: 13,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            No publish attempts yet. Successful and failed publishes will be
            logged here (kept locally, last 50 entries).
          </p>
        ) : (
          <ScrollArea className="max-h-[55vh] rounded-md">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {entries.map((e, i) => {
                const abs = new Date(e.timestamp).toLocaleString();
                return (
                  <div
                    key={`${e.timestamp}-${i}`}
                    className="forge-publog-item"
                    title={`At ${abs}`}
                  >
                    <div className="forge-publog-row">
                      <span
                        className={`forge-publog-badge ${
                          e.success ? "ok" : "fail"
                        }`}
                        title={e.success ? "Succeeded" : "Failed"}
                      >
                        {e.success ? (
                          <CheckCircle2 size={11} />
                        ) : (
                          <XCircle size={11} />
                        )}
                        {e.success ? "ok" : "fail"}
                      </span>
                      <span className="forge-publog-kind">{e.targetKind}</span>
                      <span
                        className="forge-publog-time"
                        title={abs}
                      >
                        {relTime(e.timestamp, now)}
                      </span>
                      <button
                        type="button"
                        className="forge-publog-copy"
                        onClick={() => handleCopy(e.targetUrl)}
                        title="Copy target URL"
                        aria-label="Copy target URL"
                      >
                        <Copy size={11} /> copy
                      </button>
                    </div>
                    <div className="forge-publog-url" title={e.targetUrl}>
                      {trimUrl(e.targetUrl)}
                    </div>
                    <div className="forge-publog-meta">
                      <span>{e.snippetName || "—"}</span>
                      <span>·</span>
                      <span>HTTP {e.statusCode || 0}</span>
                      {e.errorMessage && (
                        <>
                          <span>·</span>
                          <span className="forge-publog-err">{e.errorMessage}</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={handleClear}
            disabled={entries.length === 0}
            type="button"
            style={{ color: "var(--forge-bad)" }}
          >
            <Trash2 size={14} /> Clear history
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)} type="button">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
