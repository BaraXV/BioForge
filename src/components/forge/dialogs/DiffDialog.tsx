"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { GitCompare } from "lucide-react";

interface DiffDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onRunDiff: (liveText: string) => void;
}

export default function DiffDialog({
  open,
  onOpenChange,
  onRunDiff,
}: DiffDialogProps) {
  const [text, setText] = useState("");

  const handleRun = () => {
    onRunDiff(text);
    onOpenChange(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" style={{
        background: "var(--forge-panel)",
        color: "var(--forge-text)",
        border: "1px solid var(--forge-edge)",
      }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ color: "var(--forge-accent2)" }}>
            <GitCompare size={16} /> Compare with Live
          </DialogTitle>
        </DialogHeader>
        <p style={{ color: "var(--forge-dim)", fontSize: 13, lineHeight: 1.6 }}>
          Run the fetch script (Load Current) on a janitorai.com tab, copy the
          content between the markers, paste below.
        </p>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the LIVE bio content here..."
          className="min-h-[180px] font-mono text-xs"
          style={{
            background: "var(--forge-panel2)",
            color: "var(--forge-text)",
            border: "1px solid var(--forge-edge)",
          }}
        />
        <DialogFooter>
          <Button variant="ghost" onClick={handleCopy} type="button">
            Copy
          </Button>
          <Button onClick={handleRun} type="button">Show Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
