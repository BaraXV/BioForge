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
import { Input } from "@/components/ui/input";
import { useForge } from "@/store/forge/useForge";
import {
  Plus,
  Copy as CopyIcon,
  Trash2,
  Pencil,
  Check,
  X,
  FileText,
} from "lucide-react";
import { useState } from "react";

interface SnippetManagerProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export default function SnippetManager({
  open,
  onOpenChange,
}: SnippetManagerProps) {
  const snippets = useForge((s) => s.snippets);
  const activeId = useForge((s) => s.activeId);
  const addSnippet = useForge((s) => s.addSnippet);
  const switchSnippet = useForge((s) => s.switchSnippet);
  const renameSnippet = useForge((s) => s.renameSnippet);
  const deleteSnippet = useForge((s) => s.deleteSnippet);
  const duplicateSnippet = useForge((s) => s.duplicateSnippet);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleAdd = () => {
    const name = window.prompt("Snippet name:", "Untitled bio");
    if (name !== null) addSnippet(name);
  };

  const startEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const commitEdit = () => {
    if (editingId) renameSnippet(editingId, editName || "Untitled bio");
    setEditingId(null);
    setEditName("");
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
            <FileText size={16} /> Snippet Library
          </DialogTitle>
        </DialogHeader>
        <p style={{ color: "var(--forge-dim)", fontSize: 13, margin: 0 }}>
          {snippets.length} snippet(s) stored locally. Click to load.
        </p>
        <ScrollArea className="max-h-[55vh] rounded-md" style={{
          background: "var(--forge-panel2)",
          border: "1px solid var(--forge-edge)",
        }}>
          <div style={{ padding: 6 }}>
            {snippets.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
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
                  cursor: "pointer",
                }}
                onClick={() => {
                  switchSnippet(s.id);
                  onOpenChange(false);
                }}
              >
                {editingId === s.id ? (
                  <>
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") commitEdit();
                        if (e.key === "Escape") {
                          setEditingId(null);
                          setEditName("");
                        }
                      }}
                      autoFocus
                      style={{
                        background: "var(--forge-bg)",
                        color: "var(--forge-text)",
                        border: "1px solid var(--forge-edge)",
                        flex: 1,
                        fontSize: 12,
                      }}
                    />
                    <button
                      className="forge-btn ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        commitEdit();
                      }}
                      type="button"
                      style={{ padding: "4px 8px" }}
                      aria-label="Confirm rename"
                    >
                      <Check size={13} />
                    </button>
                    <button
                      className="forge-btn ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(null);
                        setEditName("");
                      }}
                      type="button"
                      style={{ padding: "4px 8px" }}
                      aria-label="Cancel rename"
                    >
                      <X size={13} />
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        fontSize: 12,
                        fontFamily: "Consolas, monospace",
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "var(--forge-text)",
                      }}
                    >
                      {s.name}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "var(--forge-dim)",
                        fontFamily: "monospace",
                      }}
                    >
                      {s.html.length.toLocaleString()} ch
                    </span>
                    <button
                      className="forge-btn ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEdit(s.id, s.name);
                      }}
                      type="button"
                      style={{ padding: "4px 8px" }}
                      aria-label={`Rename ${s.name}`}
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      className="forge-btn ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateSnippet(s.id);
                      }}
                      type="button"
                      style={{ padding: "4px 8px" }}
                      aria-label={`Duplicate ${s.name}`}
                    >
                      <CopyIcon size={12} />
                    </button>
                    <button
                      className="forge-btn ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm(
                            `Delete "${s.name}"? This cannot be undone.`,
                          )
                        ) {
                          deleteSnippet(s.id);
                        }
                      }}
                      type="button"
                      style={{ padding: "4px 8px" }}
                      aria-label={`Delete ${s.name}`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleAdd} type="button">
            <Plus size={14} /> New Snippet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
