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
import { Bug, Copy } from "lucide-react";
import type { SelfTestReport } from "@/lib/forge/selfTest";

interface SelfTestDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  report: SelfTestReport | null;
}

export default function SelfTestDialog({
  open,
  onOpenChange,
  report,
}: SelfTestDialogProps) {
  if (!report) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(report.text);
    } catch {
      // ignore
    }
  };

  // Precompute which result indices start a new group
  const groupStarts = new Set<number>();
  report.results.forEach((r, i) => {
    if (i === 0 || r.group !== report.results[i - 1].group) {
      groupStarts.add(i);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" style={{
        background: "var(--forge-panel)",
        color: "var(--forge-text)",
        border: "1px solid var(--forge-edge)",
      }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ color: "var(--forge-accent2)" }}>
            <Bug size={16} /> Self-Test Report
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div style={{ padding: "0 4px" }}>
            {report.results.map((r, i) => (
              <div key={i}>
                {groupStarts.has(i) && <div className="st-group">{r.group}</div>}
                <div className="st-line">
                  <span className={r.pass ? "st-pass" : "st-fail"}>
                    {r.pass ? "✓ PASS" : "✗ FAIL"}
                  </span>
                  <span>{r.name}</span>
                  {r.detail && <span className="st-detail">({r.detail})</span>}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <p
          className="st-summary"
          style={{
            color: report.allNominal ? "var(--forge-ok)" : "var(--forge-bad)",
          }}
        >
          {report.passed} / {report.total} passed —{" "}
          {report.allNominal
            ? "all systems nominal."
            : "failures detected, see above."}
        </p>
        <DialogFooter>
          <Button variant="ghost" onClick={handleCopy} type="button">
            <Copy size={14} /> Copy Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
