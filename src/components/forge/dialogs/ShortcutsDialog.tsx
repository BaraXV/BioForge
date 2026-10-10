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
import { Keyboard, Printer } from "lucide-react";

interface ShortcutsDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

interface ShortcutEntry {
  keys: string[];
  description: string;
}

interface ShortcutGroup {
  category: string;
  entries: ShortcutEntry[];
}

/** All keyboard shortcuts in the app, grouped by category. */
const SHORTCUTS: ShortcutGroup[] = [
  {
    category: "Editor",
    entries: [
      { keys: ["Ctrl", "H"], description: "Open Find & Replace" },
      { keys: ["Ctrl", "G"], description: "Go to line" },
      { keys: ["Ctrl", "Shift", "D"], description: "Duplicate current line (or selection)" },
      { keys: ["Alt", "↑"], description: "Move current line up" },
      { keys: ["Alt", "↓"], description: "Move current line down" },
      { keys: ["Ctrl", "/"], description: "Toggle HTML comment on selected lines" },
      { keys: ["Ctrl", "="], description: "Increase editor font size" },
      { keys: ["Ctrl", "-"], description: "Decrease editor font size" },
      { keys: ["Ctrl", "0"], description: "Reset editor font size" },
      { keys: ["Tab"], description: "Expand Emmet abbreviation (or indent 2 spaces)" },
      { keys: ["Shift", "Tab"], description: "Outdent selected lines" },
      { keys: ["Enter"], description: "Auto-indent (matches current line + nested when inside an open tag)" },
    ],
  },
  {
    category: "App",
    entries: [
      { keys: ["Ctrl", "S"], description: "Save (force vault flush)" },
      { keys: ["Ctrl", "Shift", "F"], description: "Format HTML" },
      { keys: ["Ctrl", "Shift", "L"], description: "Lint HTML" },
      { keys: ["Ctrl", "Shift", "P"], description: "Publish to JanitorAI" },
      { keys: ["?"], description: "Open this keyboard shortcut cheatsheet" },
    ],
  },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="forge-kbd">{children}</kbd>;
}

function renderKeys(keys: string[]) {
  return (
    <span className="forge-kbd-group">
      {keys.map((k, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
          {i > 0 && <span className="forge-kbd-plus">+</span>}
          <Kbd>{k}</Kbd>
        </span>
      ))}
    </span>
  );
}

export default function ShortcutsDialog({
  open,
  onOpenChange,
}: ShortcutsDialogProps) {
  const handlePrint = () => {
    // Defer so the dialog finishes its layout before the print dialog opens.
    requestAnimationFrame(() => window.print());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl forge-shortcuts-dialog"
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
            <Keyboard size={16} /> Keyboard shortcuts
          </DialogTitle>
        </DialogHeader>
        <p style={{ color: "var(--forge-dim)", fontSize: 12, margin: 0 }}>
          All shortcuts use <Kbd>Ctrl</Kbd> on Windows/Linux and <Kbd>Cmd</Kbd> on macOS.
        </p>
        <ScrollArea
          className="max-h-[55vh] rounded-md"
          style={{
            background: "var(--forge-panel2)",
            border: "1px solid var(--forge-edge)",
          }}
        >
          <div style={{ padding: "8px 10px" }}>
            {SHORTCUTS.map((group) => (
              <div key={group.category} className="forge-shortcuts-group">
                <div className="forge-shortcuts-cat">{group.category}</div>
                <table className="forge-shortcuts-table">
                  <tbody>
                    {group.entries.map((entry, i) => (
                      <tr key={i}>
                        <td className="forge-shortcuts-keys">{renderKeys(entry.keys)}</td>
                        <td className="forge-shortcuts-desc">{entry.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter style={{ flexWrap: "wrap", gap: 8 }}>
          <Button
            onClick={handlePrint}
            type="button"
            variant="outline"
            style={{
              background: "transparent",
              borderColor: "var(--forge-edge)",
              color: "var(--forge-accent2)",
            }}
          >
            <Printer size={14} /> Print
          </Button>
          <Button onClick={() => onOpenChange(false)} type="button" variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
