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
import { Clock, Upload as UploadIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface RecentEditsDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

/** Format a relative-time string: "just now", "Xs ago", "Xm ago", "Xh ago", "Xd ago". */
function relativeTime(fromTs: number, nowMs: number): string {
  if (!fromTs) return "never";
  const diff = Math.max(0, Math.floor((nowMs - fromTs) / 1000));
  if (diff < 5) return "just now";
  if (diff < 60) return `${diff}s ago`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function RecentEditsDialog({
  open,
  onOpenChange,
}: RecentEditsDialogProps) {
  const snippets = useForge((s) => s.snippets);
  const activeId = useForge((s) => s.activeId);
  const switchSnippet = useForge((s) => s.switchSnippet);

  // Tick once per second so the relative time labels stay fresh while open.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [open]);

  const recent = useMemo(
    () =>
      [...snippets]
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, 10),
    [snippets],
  );

  const handleLoad = (id: string) => {
    switchSnippet(id);
    onOpenChange(false);
  };

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
            <Clock size={16} /> Recent edits
          </DialogTitle>
        </DialogHeader>
        <p style={{ color: "var(--forge-dim)", fontSize: 12, margin: 0 }}>
          The 10 most recently modified snippets. Click <b>Load</b> to switch to one.
        </p>
        {recent.length === 0 ? (
          <div
            style={{
              padding: 24,
              textAlign: "center",
              color: "var(--forge-dim)",
              fontSize: 12,
            }}
          >
            No snippets yet.
          </div>
        ) : (
          <ScrollArea
            className="max-h-[55vh] rounded-md"
            style={{
              background: "var(--forge-panel2)",
              border: "1px solid var(--forge-edge)",
            }}
          >
            <div style={{ padding: 6 }}>
              {recent.map((s, idx) => (
                <div
                  key={s.id}
                  className="forge-recent-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    borderRadius: 6,
                    marginBottom: 4,
                    background:
                      s.id === activeId
                        ? "rgba(120,90,180,0.18)"
                        : "transparent",
                    border:
                      s.id === activeId
                        ? "1px solid var(--forge-accent)"
                        : "1px solid transparent",
                  }}
                >
                  <span className="forge-recent-rank">{idx + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      className="forge-recent-name"
                      title={s.name}
                    >
                      {s.name}
                      {s.id === activeId && (
                        <span className="forge-recent-active"> (active)</span>
                      )}
                    </div>
                    <div className="forge-recent-meta">
                      <span className="forge-recent-when">
                        {relativeTime(s.updatedAt, now)}
                      </span>
                      <span className="forge-recent-sep">·</span>
                      <span>{s.html.length.toLocaleString()} ch</span>
                      {(s.tags?.length ?? 0) > 0 && (
                        <>
                          <span className="forge-recent-sep">·</span>
                          <span>{s.tags?.length} tag{(s.tags?.length ?? 0) !== 1 ? "s" : ""}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="forge-btn ember"
                    style={{ padding: "4px 10px", fontSize: 11 }}
                    onClick={() => handleLoad(s.id)}
                  >
                    <UploadIcon size={12} /> Load
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} type="button" variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
