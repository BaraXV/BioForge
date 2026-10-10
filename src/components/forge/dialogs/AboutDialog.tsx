"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hexagon } from "lucide-react";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export default function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" style={{
        background: "var(--forge-panel)",
        color: "var(--forge-text)",
        border: "1px solid var(--forge-edge)",
      }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ color: "var(--forge-accent2)" }}>
            <Hexagon size={16} /> JAI FORGE v1.0 — Next.js edition
          </DialogTitle>
        </DialogHeader>
        <div style={{ color: "var(--forge-dim)", fontSize: 13, lineHeight: 1.7 }}>
          <p style={{ marginTop: 0 }}>
            <b style={{ color: "var(--forge-text)" }}>Double-wrapper aware:</b> the
            block mapper reads the actual house format — background wrapper,
            max-width container, sections inside at depth 2.
          </p>
          <p>
            <b style={{ color: "var(--forge-text)" }}>Sandboxed preview:</b> scripts,
            event handlers, iframes, and embeds are stripped before rendering —
            pasting foreign HTML is safe.
          </p>
          <p>
            <b style={{ color: "var(--forge-text)" }}>Multi-snippet vault:</b> keep
            multiple bios in the local snippet library and switch between them
            instantly. Everything autosaves to your browser.
          </p>
          <p>
            <b style={{ color: "var(--forge-text)" }}>Keyboard shortcuts:</b>
          </p>
          <ul style={{ margin: "4px 0", paddingLeft: 20 }}>
            <li><code>Ctrl/Cmd + S</code> — Save (force vault flush)</li>
            <li><code>Ctrl/Cmd + Shift + F</code> — Format</li>
            <li><code>Ctrl/Cmd + Shift + L</code> — Lint</li>
            <li><code>Ctrl/Cmd + Shift + P</code> — Publish</li>
            <li><code>Ctrl/Cmd + H</code> — Find &amp; Replace</li>
            <li><code>?</code> — Show this shortcuts cheatsheet</li>
          </ul>
          <p style={{ marginBottom: 0 }}>
            <b style={{ color: "var(--forge-ember)" }}>Be decent:</b> only publish
            to characters and scripts you own.
          </p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} type="button">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
