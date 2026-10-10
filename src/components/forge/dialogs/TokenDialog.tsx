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
import { Copy, KeyRound } from "lucide-react";
import { TOKEN_SCRIPT } from "@/lib/forge/publisher";
import { useForge } from "@/store/forge/useForge";

interface TokenDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export default function TokenDialog({ open, onOpenChange }: TokenDialogProps) {
  const toast = useForge((s) => s.toast);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TOKEN_SCRIPT);
      toast("Token script copied.", "ok");
    } catch {
      toast("Copy failed — select the text manually.", "error");
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
            <KeyRound size={16} /> Get your access token
          </DialogTitle>
        </DialogHeader>
        <p style={{ color: "var(--forge-dim)", fontSize: 13, lineHeight: 1.7 }}>
          1. Copy the script below.<br />
          2. Open <code>janitorai.com</code> logged in.<br />
          3. Press <kbd>F12</kbd> → Console → paste → Enter.<br />
          4. Copy the printed token into the Access Token field.
        </p>
        <ScrollArea className="max-h-[50vh] rounded-md" style={{
          background: "rgba(8,7,12,0.85)",
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
            {TOKEN_SCRIPT}
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
