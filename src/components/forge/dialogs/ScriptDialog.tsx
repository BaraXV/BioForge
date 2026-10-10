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
import { Copy } from "lucide-react";
import { useForge } from "@/store/forge/useForge";

interface ScriptDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  note: string;
  body: string;
}

export default function ScriptDialog({
  open,
  onOpenChange,
  title,
  note,
  body,
}: ScriptDialogProps) {
  const toast = useForge((s) => s.toast);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      toast("Copied — paste into JAI console (F12).", "ok");
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = body;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        toast("Copied — paste into JAI console (F12).", "ok");
      } catch {
        toast("Copy failed — select the text manually.", "error");
      }
      ta.remove();
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
          <DialogTitle style={{ color: "var(--forge-accent2)" }}>
            {title}
          </DialogTitle>
        </DialogHeader>
        <p style={{ color: "var(--forge-dim)", fontSize: 13, lineHeight: 1.6 }}>
          {note}
        </p>
        <ScrollArea className="max-h-[50vh] rounded-md" style={{
          background: "var(--forge-bg)",
          border: "1px solid var(--forge-edge)",
        }}>
          <pre style={{
            padding: 10,
            fontSize: 11,
            color: "var(--forge-gold)",
            whiteSpace: "pre",
            fontFamily: "Consolas, monospace",
            margin: 0,
          }}>
            {body}
          </pre>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleCopy} type="button">
            <Copy size={14} /> Copy Script
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
