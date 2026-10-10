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
import type { Snippet, SnippetHistoryEntry } from "@/lib/forge/vault";
import { parseBackup, type VaultBackup } from "@/lib/forge/vault";
import { TEMPLATE_LIST } from "@/lib/forge/templates";
import { sanitize } from "@/lib/forge/sanitizer";
import {
  Plus,
  Copy as CopyIcon,
  Trash2,
  Pencil,
  Check,
  X,
  FileText,
  Search as SearchIcon,
  Tag as TagIcon,
  History as HistoryIcon,
  Download,
  Upload,
  Sparkles,
  GitCompare,
  LayoutGrid,
  List as ListIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import CompareSnippetsDialog from "./CompareSnippetsDialog";

interface SnippetManagerProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

interface FilteredHit {
  snippet: Snippet;
  /** Where the match was found, for snippet excerpts. */
  matchField: "name" | "html" | "tag" | null;
  /** Index of the match within the html (for highlighting). */
  matchIndex: number;
}

/** Render an excerpt with the matched substring highlighted via <mark>. */
function HighlightedExcerpt({
  html,
  idx,
  query,
}: {
  html: string;
  idx: number;
  query: string;
}) {
  if (idx < 0 || !query) return <>{html}</>;
  const radius = 40;
  const start = Math.max(0, idx - radius);
  const end = Math.min(html.length, idx + query.length + radius);
  const before = (start > 0 ? "…" : "") + html.slice(start, idx);
  const mid = html.slice(idx, idx + query.length);
  const after = html.slice(idx + query.length, end) + (end < html.length ? "…" : "");
  return (
    <>
      {before}
      <mark className="forge-search-mark">{mid}</mark>
      {after}
    </>
  );
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
  const addTag = useForge((s) => s.addTag);
  const removeTag = useForge((s) => s.removeTag);
  const createFromTemplate = useForge((s) => s.createFromTemplate);
  const exportVault = useForge((s) => s.exportVault);
  const importVault = useForge((s) => s.importVault);
  const toast = useForge((s) => s.toast);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  // Search (debounced 150ms)
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(searchInput.trim()), 150);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Tag filter
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Per-snippet tag-input draft
  const [tagDraftId, setTagDraftId] = useState<string | null>(null);
  const [tagDraft, setTagDraft] = useState("");

  // Template picker
  const [templateOpen, setTemplateOpen] = useState(false);

  // History dialog
  const [historySnippetId, setHistorySnippetId] = useState<string | null>(null);

  // Compare dialog — A is the snippet whose Compare button was clicked.
  const [compareAId, setCompareAId] = useState<string | null>(null);

  // View mode: list (default) or gallery (mini rendered previews)
  const [viewMode, setViewMode] = useState<"list" | "gallery">("list");

  // Import file input
  const importInputRef = useRef<HTMLInputElement | null>(null);

  // Reset transient UI state when the dialog closes. Done in the
  // onOpenChange wrapper (not a useEffect) to avoid setState-in-effect
  // cascading renders.
  const resetTransient = () => {
    setEditingId(null);
    setEditName("");
    setSearchInput("");
    setSearchQuery("");
    setActiveTag(null);
    setTagDraftId(null);
    setTagDraft("");
    setTemplateOpen(false);
    setHistorySnippetId(null);
    setCompareAId(null);
    setViewMode("list");
  };
  const handleOpenChange = (o: boolean) => {
    if (!o) resetTransient();
    onOpenChange(o);
  };

  // All unique tags across the vault, sorted by frequency then alphabetically.
  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const s of snippets) {
      for (const t of s.tags ?? []) {
        const key = t.toLowerCase();
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
    // Preserve original casing from the first occurrence.
    const casing = new Map<string, string>();
    for (const s of snippets) {
      for (const t of s.tags ?? []) {
        const key = t.toLowerCase();
        if (!casing.has(key)) casing.set(key, t);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([key]) => casing.get(key) ?? key);
  }, [snippets]);

  // Apply search + tag filters.
  const hits = useMemo<FilteredHit[]>(() => {
    const q = searchQuery.toLowerCase();
    const out: FilteredHit[] = [];
    for (const s of snippets) {
      // Tag filter is a hard gate.
      if (activeTag && !(s.tags ?? []).some((t) => t.toLowerCase() === activeTag.toLowerCase())) {
        continue;
      }
      if (!q) {
        out.push({ snippet: s, matchField: null, matchIndex: -1 });
        continue;
      }
      const nameHit = s.name.toLowerCase().indexOf(q);
      if (nameHit >= 0) {
        out.push({ snippet: s, matchField: "name", matchIndex: nameHit });
        continue;
      }
      const tagHit = (s.tags ?? []).findIndex((t) => t.toLowerCase().includes(q));
      if (tagHit >= 0) {
        out.push({ snippet: s, matchField: "tag", matchIndex: tagHit });
        continue;
      }
      const htmlHit = s.html.toLowerCase().indexOf(q);
      if (htmlHit >= 0) {
        out.push({ snippet: s, matchField: "html", matchIndex: htmlHit });
      }
    }
    return out;
  }, [snippets, searchQuery, activeTag]);

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

  const commitTagDraft = (snippetId: string) => {
    const raw = tagDraft.trim();
    if (!raw) {
      setTagDraftId(null);
      setTagDraft("");
      return;
    }
    // Support comma-separated entry: "a, b, c" → three tags.
    const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
    for (const p of parts) addTag(snippetId, p);
    setTagDraft("");
  };

  const handleExportAll = () => {
    const backup = exportVault();
    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const stamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    a.download = `forge-vault-backup-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast(`Exported ${backup.snippets.length} snippet(s) to JSON.`, "ok");
  };

  const handleImportClick = () => {
    importInputRef.current?.click();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const backup = parseBackup(text);
      if (!backup) {
        toast("Backup file is invalid or corrupted.", "error");
        return;
      }
      void applyImport(backup);
    };
    reader.onerror = () => toast("Failed to read backup file.", "error");
    reader.readAsText(file);
    e.target.value = "";
  };

  const applyImport = (backup: VaultBackup) => {
    const existingIds = new Set(snippets.map((s) => s.id));
    const overlaps = backup.snippets.filter((s) => existingIds.has(s.id)).length;
    const doImport = (overwrite: boolean) => {
      const stats = importVault(backup, { overwrite });
      toast(
        `Imported: ${stats.added} added, ${stats.overwritten} overwritten, ${stats.skipped} skipped.`,
        "ok",
      );
    };
    if (overlaps === 0) {
      doImport(false);
      return;
    }
    const ok = window.confirm(
      `${overlaps} snippet(s) in this backup already exist in your vault.\n\n` +
        `Click OK to OVERWRITE them with the backup versions, or Cancel to skip duplicates (new snippets will still be added).`,
    );
    doImport(ok);
  };

  const handlePickTemplate = (key: string) => {
    const id = createFromTemplate(key);
    setTemplateOpen(false);
    if (id) handleOpenChange(false);
  };

  const historySnippet = historySnippetId
    ? snippets.find((s) => s.id === historySnippetId) ?? null
    : null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-3xl"
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
            <FileText size={16} /> Snippet Library
          </DialogTitle>
        </DialogHeader>
        <p style={{ color: "var(--forge-dim)", fontSize: 13, margin: 0 }}>
          {snippets.length} snippet(s) stored locally · {hits.length} shown. Click to load.
        </p>

        {/* Search + tag filter row */}
        <div className="forge-mgr-toolbar">
          <div className="forge-search-input-wrap">
            <SearchIcon size={13} className="forge-search-icon" />
            <input
              className="forge-search-input"
              type="text"
              placeholder="Search by name, content, or tag…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Search snippets"
            />
            {searchInput && (
              <button
                type="button"
                className="forge-btn ghost"
                style={{ padding: "2px 6px", fontSize: 10 }}
                onClick={() => setSearchInput("")}
                aria-label="Clear search"
              >
                <X size={11} />
              </button>
            )}
          </div>
          <div
            className="forge-view-toggle"
            role="group"
            aria-label="Snippet view mode"
            title="Toggle list / gallery view"
          >
            <button
              type="button"
              className={`forge-view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
            >
              <ListIcon size={12} /> List
            </button>
            <button
              type="button"
              className={`forge-view-toggle-btn ${viewMode === "gallery" ? "active" : ""}`}
              onClick={() => setViewMode("gallery")}
              aria-pressed={viewMode === "gallery"}
            >
              <LayoutGrid size={12} /> Gallery
            </button>
          </div>
        </div>

        {allTags.length > 0 && (
          <div className="forge-tag-filter-row" role="group" aria-label="Filter by tag">
            <TagIcon size={12} style={{ opacity: 0.7, flexShrink: 0 }} />
            <button
              type="button"
              className={`forge-tag-badge ${activeTag === null ? "active" : ""}`}
              onClick={() => setActiveTag(null)}
            >
              all
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                className={`forge-tag-badge ${activeTag === t ? "active" : ""}`}
                onClick={() => setActiveTag((cur) => (cur === t ? null : t))}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <ScrollArea
          className="max-h-[50vh] rounded-md"
          style={{
            background: "var(--forge-panel2)",
            border: "1px solid var(--forge-edge)",
          }}
        >
          {viewMode === "gallery" ? (
            <SnippetGallery
              hits={hits}
              activeId={activeId}
              onPick={(id) => {
                switchSnippet(id);
                handleOpenChange(false);
              }}
            />
          ) : (
            <div style={{ padding: 6 }}>
              {hits.length === 0 && (
                <div
                  style={{
                    padding: 24,
                    textAlign: "center",
                    color: "var(--forge-dim)",
                    fontSize: 12,
                  }}
                >
                  No snippets match your filters.
                </div>
              )}
            {hits.map(({ snippet: s, matchField, matchIndex }) => (
              <div
                key={s.id}
                className="forge-snippet-row"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  padding: "8px 10px",
                  borderRadius: 6,
                  marginBottom: 4,
                  background:
                    s.id === activeId ? "rgba(120,90,180,0.18)" : "transparent",
                  border:
                    s.id === activeId
                      ? "1px solid var(--forge-accent)"
                      : "1px solid transparent",
                  cursor: "pointer",
                }}
                onClick={() => {
                  switchSnippet(s.id);
                  handleOpenChange(false);
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                        className="forge-snippet-name"
                        title={s.name}
                        style={{ flex: 1 }}
                      >
                        {matchField === "name" && matchIndex >= 0 ? (
                          <Highlighted text={s.name} start={matchIndex} query={searchQuery} />
                        ) : (
                          s.name
                        )}
                      </span>
                      <span className="forge-snippet-meta">
                        {s.html.length.toLocaleString()} ch
                        {(s.history?.length ?? 0) > 0 && ` · ${s.history?.length ?? 0}↺`}
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
                          setHistorySnippetId(s.id);
                        }}
                        type="button"
                        style={{ padding: "4px 8px" }}
                        aria-label={`History for ${s.name}`}
                        title="Version history"
                      >
                        <HistoryIcon size={12} />
                      </button>
                      <button
                        className="forge-btn ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCompareAId(s.id);
                        }}
                        type="button"
                        style={{ padding: "4px 8px" }}
                        aria-label={`Compare ${s.name} with another snippet`}
                        title="Compare with another snippet"
                      >
                        <GitCompare size={12} />
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

                {/* Tag badges + inline tag editor */}
                <div className="forge-tag-row" onClick={(e) => e.stopPropagation()}>
                  {(s.tags ?? []).map((t) => (
                    <span key={t} className="forge-tag">
                      {t}
                      <button
                        type="button"
                        className="forge-tag-x"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTag(s.id, t);
                        }}
                        aria-label={`Remove tag ${t}`}
                      >
                        <X size={9} />
                      </button>
                    </span>
                  ))}
                  {tagDraftId === s.id ? (
                    <input
                      className="forge-tag-input"
                      autoFocus
                      value={tagDraft}
                      onChange={(e) => setTagDraft(e.target.value)}
                      onBlur={() => commitTagDraft(s.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          commitTagDraft(s.id);
                        } else if (e.key === "Escape") {
                          setTagDraftId(null);
                          setTagDraft("");
                        }
                      }}
                      placeholder="tag, tag, … (Enter to add)"
                    />
                  ) : (
                    <button
                      type="button"
                      className="forge-tag-add"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTagDraftId(s.id);
                        setTagDraft("");
                      }}
                      aria-label="Add tag"
                    >
                      <TagIcon size={9} /> tag
                    </button>
                  )}
                </div>

                {/* Search-result content excerpt with highlighted match */}
                {matchField === "html" && matchIndex >= 0 && (
                  <div className="forge-search-excerpt">
                    <HighlightedExcerpt html={s.html} idx={matchIndex} query={searchQuery} />
                  </div>
                )}
                {matchField === "tag" && (
                  <div className="forge-search-excerpt">
                    matched tag: <b>{(s.tags ?? [])[matchIndex]}</b>
                  </div>
                )}
              </div>
            ))}
            </div>
          )}
        </ScrollArea>

        {/* Template picker (collapsible) */}
        {templateOpen && (
          <div className="forge-template-picker">
            {TEMPLATE_LIST.map((tpl) => (
              <button
                key={tpl.key}
                type="button"
                className="forge-template-card"
                onClick={() => handlePickTemplate(tpl.key)}
              >
                <div className="forge-template-label">
                  <Sparkles size={12} /> {tpl.label}
                </div>
                <div className="forge-template-desc">{tpl.description}</div>
              </button>
            ))}
          </div>
        )}

        <DialogFooter style={{ flexWrap: "wrap", gap: 8 }}>
          <Button onClick={handleAdd} type="button">
            <Plus size={14} /> New Snippet
          </Button>
          <Button
            onClick={() => setTemplateOpen((v) => !v)}
            type="button"
            variant="outline"
            style={{
              background: "transparent",
              borderColor: "var(--forge-edge)",
              color: "var(--forge-dim)",
            }}
          >
            <Sparkles size={14} /> {templateOpen ? "Close Templates" : "New from Template"}
          </Button>
          <Button
            onClick={handleExportAll}
            type="button"
            variant="outline"
            style={{
              background: "transparent",
              borderColor: "var(--forge-edge)",
              color: "var(--forge-dim)",
            }}
          >
            <Download size={14} /> Export All
          </Button>
          <Button
            onClick={handleImportClick}
            type="button"
            variant="outline"
            style={{
              background: "transparent",
              borderColor: "var(--forge-edge)",
              color: "var(--forge-dim)",
            }}
          >
            <Upload size={14} /> Import Backup
          </Button>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleImportFile}
            style={{ display: "none" }}
          />
        </DialogFooter>
      </DialogContent>

      {historySnippet && (
        <HistoryDialog
          snippet={historySnippet}
          open={!!historySnippetId}
          onOpenChange={(o) => {
            if (!o) setHistorySnippetId(null);
          }}
        />
      )}

      {compareAId && (
        <CompareSnippetsDialog
          open={!!compareAId}
          onOpenChange={(o) => {
            if (!o) setCompareAId(null);
          }}
          snippetAId={compareAId}
        />
      )}
    </Dialog>
  );
}

/** Wrap the matched substring in a <mark> for visual highlighting. */
function Highlighted({
  text,
  start,
  query,
}: {
  text: string;
  start: number;
  query: string;
}) {
  if (start < 0 || !query) return <>{text}</>;
  const before = text.slice(0, start);
  const mid = text.slice(start, start + query.length);
  const after = text.slice(start + query.length);
  return (
    <>
      {before}
      <mark className="forge-search-mark">{mid}</mark>
      {after}
    </>
  );
}

/** Maximum number of thumbnail previews rendered at once. Each preview
 *  parses + lays out a sanitized HTML payload, so capping this keeps the
 *  dialog responsive even on very large vaults. */
const GALLERY_MAX = 50;

/**
 * Gallery view for the snippet manager — renders up to GALLERY_MAX snippets
 * as cards with a mini live-HTML thumbnail. The thumbnail is a div with the
 * sanitized snippet HTML rendered at full size inside a wrapper that scales
 * it down via `transform: scale(0.3)`. Pointer events are disabled on the
 * scaled preview so the parent card stays the click target.
 */
function SnippetGallery({
  hits,
  activeId,
  onPick,
}: {
  hits: FilteredHit[];
  activeId: string | null;
  onPick: (id: string) => void;
}) {
  if (hits.length === 0) {
    return (
      <div
        style={{
          padding: 24,
          textAlign: "center",
          color: "var(--forge-dim)",
          fontSize: 12,
        }}
      >
        No snippets match your filters.
      </div>
    );
  }
  const shown = hits.slice(0, GALLERY_MAX);
  const truncated = hits.length - shown.length;
  return (
    <div className="forge-gallery-grid">
      {shown.map(({ snippet: s }) => (
        <SnippetGalleryCard
          key={s.id}
          snippet={s}
          active={s.id === activeId}
          onPick={() => onPick(s.id)}
        />
      ))}
      {truncated > 0 && (
        <div
          style={{
            gridColumn: "1 / -1",
            padding: 12,
            textAlign: "center",
            color: "var(--forge-dim)",
            fontSize: 11,
            fontFamily: "Consolas, monospace",
          }}
        >
          {truncated} more not shown — narrow your search to see them.
        </div>
      )}
    </div>
  );
}

/**
 * A single gallery card. The thumbnail is a 200×150 wrapper with a 668×500
 * inner preview (≈ the wrapper size / 0.3) that's scaled down to fit. This
 * keeps the rendered HTML at a readable size while the visible footprint is
 * small. We use dangerouslySetInnerHTML because the HTML has already been
 * through the same sanitizer the live preview uses — scripts, iframes, and
 * event handlers are stripped before insertion.
 */
function SnippetGalleryCard({
  snippet,
  active,
  onPick,
}: {
  snippet: Snippet;
  active: boolean;
  onPick: () => void;
}) {
  const isEmpty = snippet.html.trim().length === 0;
  // Sanitize once per render; cheap (regex passes) and lets us reuse the
  // same sanitizer the live preview iframe uses.
  const sanitized = useMemo(() => sanitize(snippet.html), [snippet.html]);
  const updatedLabel = (() => {
    const diff = Date.now() - snippet.updatedAt;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  })();
  return (
    <div
      className={`forge-gallery-card ${active ? "active" : ""}`}
      onClick={onPick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPick();
        }
      }}
      aria-label={`Load snippet ${snippet.name}`}
    >
      <div className="forge-gallery-thumb-wrap">
        {isEmpty ? (
          <div className="forge-gallery-thumb-empty">(empty)</div>
        ) : (
          <div className="forge-gallery-thumb">
            <div
              className="forge-gallery-thumb-inner"
              dangerouslySetInnerHTML={{ __html: sanitized }}
            />
          </div>
        )}
      </div>
      <div
        className="forge-gallery-name"
        title={snippet.name}
      >
        {snippet.name}
      </div>
      <div className="forge-gallery-meta">
        <span>{snippet.html.length.toLocaleString()} ch</span>
        <span>{updatedLabel}</span>
      </div>
    </div>
  );
}

interface HistoryDialogProps {
  snippet: Snippet;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

function HistoryDialog({ snippet, open, onOpenChange }: HistoryDialogProps) {
  const restoreFromHistory = useForge((s) => s.restoreFromHistory);
  const [pending, setPending] = useState<number | null>(null);
  const history: SnippetHistoryEntry[] = snippet.history ?? [];

  // Format timestamps relative to now.
  const fmt = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const preview = (html: string) => {
    const trimmed = html.replace(/\s+/g, " ").trim();
    return trimmed.length > 80 ? trimmed.slice(0, 80) + "…" : trimmed || "(empty)";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-xl"
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
            <HistoryIcon size={16} /> History — {snippet.name}
          </DialogTitle>
        </DialogHeader>
        <p style={{ color: "var(--forge-dim)", fontSize: 12, margin: 0 }}>
          Last {history.length} version(s). Click to restore (current html is snapshotted for undo).
        </p>
        {history.length === 0 ? (
          <div
            style={{
              padding: 18,
              textAlign: "center",
              color: "var(--forge-dim)",
              fontSize: 12,
            }}
          >
            No history yet — edit the snippet to start accumulating versions.
          </div>
        ) : (
          <ScrollArea
            className="max-h-[50vh] rounded-md"
            style={{
              background: "var(--forge-panel2)",
              border: "1px solid var(--forge-edge)",
            }}
          >
            <div style={{ padding: 6 }}>
              {[...history].reverse().map((entry, revIdx) => {
                const originalIdx = history.length - 1 - revIdx;
                return (
                  <div
                    key={`${originalIdx}-${entry.savedAt}`}
                    className="forge-history-item"
                  >
                    <div className="forge-history-meta">
                      <span className="forge-history-when">{fmt(entry.savedAt)}</span>
                      <span className="forge-history-size">
                        {entry.html.length.toLocaleString()} ch
                      </span>
                    </div>
                    <div className="forge-history-preview">{preview(entry.html)}</div>
                    {pending === originalIdx ? (
                      <div className="forge-history-confirm">
                        <span>Restore this version?</span>
                        <button
                          type="button"
                          className="forge-btn ember"
                          style={{ padding: "3px 8px", fontSize: 11 }}
                          onClick={() => {
                            restoreFromHistory(snippet.id, originalIdx);
                            setPending(null);
                            onOpenChange(false);
                          }}
                        >
                          Restore
                        </button>
                        <button
                          type="button"
                          className="forge-btn ghost"
                          style={{ padding: "3px 8px", fontSize: 11 }}
                          onClick={() => setPending(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="forge-btn ghost"
                        style={{ padding: "3px 8px", fontSize: 11, marginTop: 4 }}
                        onClick={() => setPending(originalIdx)}
                      >
                        Restore this version
                      </button>
                    )}
                  </div>
                );
              })}
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
