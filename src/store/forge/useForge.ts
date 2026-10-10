/**
 * Forge store — central state for the JAI FORGE editor.
 * Uses Zustand for lightweight client state management.
 */

"use client";

import { create } from "zustand";
import {
  loadVault,
  saveVault,
  createSnippet,
  parseBackup,
  type Snippet,
  type SnippetHistoryEntry,
  type VaultBackup,
  type VaultMeta,
} from "@/lib/forge/vault";
import { TEMPLATES } from "@/lib/forge/templates";

/** localStorage keys for editor preferences (persisted independently of vault). */
const LS_FONT_SIZE = "forge-pref-font-size";
const LS_LINE_NUMBERS = "forge-pref-line-numbers";
const LS_PUBLISH_MODE = "forge-pref-publish-mode";

/** Draft vs published selection for script-target publishes. */
export type PublishMode = "both" | "draft" | "published";
const LS_APP_THEME = "forge-pref-app-theme";
const LS_CUSTOM_FONTS = "forge-pref-custom-fonts";
const LS_DEVICE_MODE = "forge-pref-device";
const LS_PREVIEW_ZOOM = "forge-pref-zoom";
const LS_PREVIEW_INSPECTOR = "forge-pref-inspector";

/** Preview device mode options. */
export type PreviewDeviceMode = "mobile" | "tablet" | "desktop";

/** Clamp range for preview zoom (percent). */
const MIN_ZOOM = 25;
const MAX_ZOOM = 200;

export interface ToastItem {
  id: number;
  message: string;
  kind: "ok" | "error" | "note";
  detail?: string;
  sticky?: boolean;
}

interface ForgeState {
  // Vault
  snippets: Snippet[];
  activeId: string | null;
  meta: VaultMeta;

  // Editor
  html: string;
  charCount: number;
  wordCount: number;
  sectionCount: number;
  syncOn: boolean;
  lineWrap: boolean;
  editorTheme: "dark" | "light";
  fontSize: number;
  showLineNumbers: boolean;
  findReplaceOpen: boolean;

  // Publish preferences
  publishMode: PublishMode;

  // Visual / theming
  appTheme: "dark" | "light";
  customFonts: string[];

  // Auto-save indicator
  saveState: "saved" | "saving" | "unsaved";
  lastSavedAt: number;

  // Preview
  previewKey: number; // bump to force refresh
  previewLabeledCount: number;
  previewWired: boolean;
  previewAccessible: boolean;
  previewDeviceMode: PreviewDeviceMode; // mobile / tablet / desktop
  previewZoom: number; // 25..200 percent
  previewInspector: boolean; // hover tooltip + click-to-source

  // Diff highlights (line indices)
  diffLines: number[];

  // Toasts
  toasts: ToastItem[];

  // Hydration flag
  hydrated: boolean;

  // Actions
  hydrate: () => void;
  setHtml: (html: string) => void;
  /** Flush any pending debounced vault write immediately. Used by Ctrl+S. */
  forceSave: () => void;
  setMeta: (partial: Partial<VaultMeta>) => void;
  toggleSync: () => void;
  toggleLineWrap: () => void;
  toggleEditorTheme: () => void;
  setFontSize: (size: number) => void;
  toggleLineNumbers: () => void;
  setFindReplaceOpen: (open: boolean) => void;
  refreshPreview: () => void;
  setPreviewState: (s: { labeled: number; wired: boolean; accessible: boolean }) => void;
  setDiffLines: (lines: number[]) => void;
  clearDiff: () => void;

  // Publish preferences
  setPublishMode: (mode: PublishMode) => void;

  // Preview enhancement actions
  setPreviewDeviceMode: (mode: PreviewDeviceMode) => void;
  setPreviewZoom: (zoom: number) => void;
  togglePreviewInspector: () => void;

  // Visual / theming actions
  toggleAppTheme: () => void;
  setAppTheme: (theme: "dark" | "light") => void;
  setCustomFonts: (fonts: string[]) => void;
  addCustomFont: (font: string) => void;
  removeCustomFont: (font: string) => void;

  // Snippet management (new feature)
  addSnippet: (name: string) => void;
  switchSnippet: (id: string) => void;
  renameSnippet: (id: string, name: string) => void;
  deleteSnippet: (id: string) => void;
  duplicateSnippet: (id: string) => void;

  // Tags & history & templates (vault enhancements)
  addTag: (snippetId: string, tag: string) => void;
  removeTag: (snippetId: string, tag: string) => void;
  restoreFromHistory: (snippetId: string, historyIndex: number) => void;
  createFromTemplate: (templateKey: string) => string | null;
  exportVault: () => VaultBackup;
  importVault: (
    backup: VaultBackup,
    opts: { overwrite: boolean },
  ) => { added: number; overwritten: number; skipped: number };

  // Toasts
  toast: (message: string, kind?: ToastItem["kind"], detail?: string, sticky?: boolean) => void;
  dismissToast: (id: number) => void;
}

let toastId = 0;
let saveIndicatorTimer: ReturnType<typeof setTimeout> | null = null;
/**
 * Debounced vault-write timer. setHtml is called on every keystroke; without
 * debouncing, every keystroke would trigger a synchronous localStorage write
 * (JSON.stringify of the entire snippets array), which can cause input lag
 * on slower devices and large vaults. We coalesce rapid edits into a single
 * write 400ms after the last keystroke. The first edit also writes through
 * immediately so the user's work is durable if they close the tab right after
 * the first character.
 */
let setHtmlSaveTimer: ReturnType<typeof setTimeout> | null = null;
const SET_HTML_DEBOUNCE_MS = 400;

function countWords(s: string): number {
  const t = s.replace(/<[^>]*>/g, " ").trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

/** Strip surrounding whitespace and commas; lowercase for stable comparison. */
function normalizeTag(raw: string): string {
  return raw.trim().replace(/^,+|,+$/g, "").trim();
}

/**
 * Schedule the indicator's transition from "saving" to "saved". Cleared and
 * reset on every setHtml so rapid keystrokes keep the indicator in "saving"
 * until 300ms after the last edit. The save itself is synchronous — this only
 * governs the visual feedback.
 */
function scheduleSavedTransition(savedAt: number) {
  if (saveIndicatorTimer) clearTimeout(saveIndicatorTimer);
  saveIndicatorTimer = setTimeout(() => {
    saveIndicatorTimer = null;
    useForge.setState({ saveState: "saved", lastSavedAt: savedAt });
  }, 300);
}

export const useForge = create<ForgeState>((set, get) => ({
  snippets: [],
  activeId: null,
  meta: { target: "", token: "", theme: "", saved: 0 },

  html: "",
  charCount: 0,
  wordCount: 0,
  sectionCount: 0,
  syncOn: true,
  lineWrap: true,
  editorTheme: "dark",
  fontSize: 13,
  showLineNumbers: true,
  findReplaceOpen: false,

  publishMode: "both",

  appTheme: "dark",
  customFonts: [],

  saveState: "saved",
  lastSavedAt: 0,

  previewKey: 0,
  previewLabeledCount: 0,
  previewWired: false,
  previewAccessible: false,
  previewDeviceMode: "desktop",
  previewZoom: 100,
  previewInspector: false,

  diffLines: [],

  toasts: [],

  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    const v = loadVault();
    const active = v.snippets.find((s) => s.id === v.activeId) ?? v.snippets[0];
    // Load editor preferences (font size, line numbers) from localStorage
    let fontSize = 13;
    let showLineNumbers = true;
    let appTheme: "dark" | "light" = "dark";
    let customFonts: string[] = [];
    let previewDeviceMode: PreviewDeviceMode = "desktop";
    let previewZoom = 100;
    let previewInspector = false;
    let publishMode: PublishMode = "both";
    if (typeof window !== "undefined") {
      const fs = parseInt(localStorage.getItem(LS_FONT_SIZE) ?? "", 10);
      if (Number.isFinite(fs) && fs >= 8 && fs <= 36) fontSize = fs;
      showLineNumbers = localStorage.getItem(LS_LINE_NUMBERS) !== "false";
      const storedMode = localStorage.getItem(LS_PUBLISH_MODE);
      if (storedMode === "draft" || storedMode === "published" || storedMode === "both") {
        publishMode = storedMode;
      }
      const storedTheme = localStorage.getItem(LS_APP_THEME);
      if (storedTheme === "light" || storedTheme === "dark") appTheme = storedTheme;
      try {
        const rawFonts = localStorage.getItem(LS_CUSTOM_FONTS);
        if (rawFonts) {
          const parsed = JSON.parse(rawFonts);
          if (Array.isArray(parsed)) {
            customFonts = parsed
              .filter((f): f is string => typeof f === "string")
              .map((f) => f.trim())
              .filter(Boolean);
          }
        }
      } catch {
        // ignore parse errors — fall back to empty list
      }
      const storedDevice = localStorage.getItem(LS_DEVICE_MODE);
      if (
        storedDevice === "mobile" ||
        storedDevice === "tablet" ||
        storedDevice === "desktop"
      ) {
        previewDeviceMode = storedDevice;
      }
      const storedZoom = parseInt(localStorage.getItem(LS_PREVIEW_ZOOM) ?? "", 10);
      if (Number.isFinite(storedZoom) && storedZoom >= MIN_ZOOM && storedZoom <= MAX_ZOOM) {
        previewZoom = storedZoom;
      }
      previewInspector = localStorage.getItem(LS_PREVIEW_INSPECTOR) === "true";
    }
    set({
      snippets: v.snippets,
      activeId: active?.id ?? null,
      meta: v.meta,
      html: active?.html ?? "",
      charCount: (active?.html ?? "").length,
      wordCount: countWords(active?.html ?? ""),
      hydrated: true,
      saveState: "saved",
      lastSavedAt: active?.updatedAt ?? Date.now(),
      fontSize,
      showLineNumbers,
      appTheme,
      customFonts,
      previewDeviceMode,
      previewZoom,
      previewInspector,
      publishMode,
    });
  },

  setHtml: (html) => {
    const state = get();
    // Update in-memory state immediately so the editor stays responsive.
    set({ html, charCount: html.length, wordCount: countWords(html), saveState: "saving" });
    if (!state.activeId) return;

    // Compute the next snippets array (with history snapshot) and update the
    // store immediately so UI subscribers (snippet list, etc.) see the new
    // html, but DEFER the localStorage write to avoid hammering the disk on
    // every keystroke. The pending write is coalesced — only the most recent
    // snippets array is persisted when the timer fires.
    const activeSnippet = state.snippets.find((s) => s.id === state.activeId);
    const prevHtml = activeSnippet?.html ?? "";
    const history = activeSnippet?.history ?? [];
    const lastEntry = history.length > 0 ? history[history.length - 1] : null;
    const lastHtml = lastEntry?.html ?? "";
    // Push the previous version into history only if it differs from the
    // most recent snapshot by more than 5 chars (length-based heuristic).
    // This avoids spamming history on every keystroke.
    const shouldSnapshot =
      prevHtml !== html &&
      (!lastEntry || Math.abs(prevHtml.length - lastHtml.length) > 5);
    const newHistory = shouldSnapshot
      ? [...history, { html: prevHtml, savedAt: Date.now() } as SnippetHistoryEntry].slice(-5)
      : history;

    const snippets = state.snippets.map((s) =>
      s.id === state.activeId
        ? {
            ...s,
            html,
            updatedAt: Date.now(),
            history: newHistory,
          }
        : s,
    );
    // Update in-memory snippets immediately so the rest of the UI is in sync.
    set({ snippets });

    // Schedule a debounced vault write. Each call cancels the previous timer
    // so we only write once per burst of edits.
    if (setHtmlSaveTimer) clearTimeout(setHtmlSaveTimer);
    setHtmlSaveTimer = setTimeout(() => {
      setHtmlSaveTimer = null;
      try {
        saveVault({
          snippets: useForge.getState().snippets,
          activeId: useForge.getState().activeId,
          meta: useForge.getState().meta,
        });
        scheduleSavedTransition(Date.now());
      } catch (e) {
        set({ saveState: "unsaved" });
        useForge.getState().toast(
          e instanceof Error ? e.message : "Vault save failed",
          "error",
        );
      }
    }, SET_HTML_DEBOUNCE_MS);
  },

  forceSave: () => {
    // Cancel any pending debounced write and flush immediately. Used by the
    // Ctrl+S handler so the "Saved to vault." toast is honest.
    if (setHtmlSaveTimer) {
      clearTimeout(setHtmlSaveTimer);
      setHtmlSaveTimer = null;
    }
    const state = get();
    if (!state.activeId) return;
    try {
      saveVault({
        snippets: state.snippets,
        activeId: state.activeId,
        meta: state.meta,
      });
      scheduleSavedTransition(Date.now());
    } catch (e) {
      set({ saveState: "unsaved" });
      get().toast(
        e instanceof Error ? e.message : "Vault save failed",
        "error",
      );
    }
  },

  setMeta: (partial) => {
    const meta = { ...get().meta, ...partial };
    set({ meta });
    try {
      saveVault({
        snippets: get().snippets,
        activeId: get().activeId,
        meta,
      });
    } catch (e) {
      get().toast(e instanceof Error ? e.message : "Meta save failed", "error");
    }
  },

  toggleSync: () => {
    const on = !get().syncOn;
    set({ syncOn: on });
    get().toast("Sync scroll " + (on ? "on." : "off."), "ok");
  },

  toggleLineWrap: () => {
    set({ lineWrap: !get().lineWrap });
  },

  toggleEditorTheme: () => {
    set({ editorTheme: get().editorTheme === "dark" ? "light" : "dark" });
  },

  setFontSize: (size) => {
    const clamped = Math.max(8, Math.min(36, Math.round(size)));
    set({ fontSize: clamped });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LS_FONT_SIZE, String(clamped));
      } catch {
        // ignore quota errors — font size is non-critical
      }
    }
  },

  toggleLineNumbers: () => {
    const on = !get().showLineNumbers;
    set({ showLineNumbers: on });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LS_LINE_NUMBERS, String(on));
      } catch {
        // ignore quota errors
      }
    }
  },

  setFindReplaceOpen: (open) => set({ findReplaceOpen: open }),

  setPublishMode: (mode) => {
    set({ publishMode: mode });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LS_PUBLISH_MODE, mode);
      } catch {
        // ignore quota errors — preference is non-critical
      }
    }
  },

  refreshPreview: () => {
    set({ previewKey: get().previewKey + 1, diffLines: [] });
  },

  setPreviewState: (s) => {
    set({
      previewLabeledCount: s.labeled,
      previewWired: s.wired,
      previewAccessible: s.accessible,
    });
  },

  setDiffLines: (lines) => set({ diffLines: lines }),
  clearDiff: () => set({ diffLines: [] }),

  setPreviewDeviceMode: (mode) => {
    set({ previewDeviceMode: mode });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LS_DEVICE_MODE, mode);
      } catch {
        // ignore quota errors — preference is non-critical
      }
    }
  },

  setPreviewZoom: (zoom) => {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(zoom)));
    set({ previewZoom: clamped });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LS_PREVIEW_ZOOM, String(clamped));
      } catch {
        // ignore quota errors
      }
    }
  },

  togglePreviewInspector: () => {
    const on = !get().previewInspector;
    set({ previewInspector: on });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LS_PREVIEW_INSPECTOR, String(on));
      } catch {
        // ignore quota errors
      }
    }
  },

  toggleAppTheme: () => {
    const next = get().appTheme === "dark" ? "light" : "dark";
    set({ appTheme: next });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LS_APP_THEME, next);
      } catch {
        // ignore quota errors
      }
    }
  },

  setAppTheme: (theme) => {
    set({ appTheme: theme });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LS_APP_THEME, theme);
      } catch {
        // ignore quota errors
      }
    }
  },

  setCustomFonts: (fonts) => {
    // Sanitize: trim, drop empties, de-dupe (case-insensitive, preserve first casing).
    const seen = new Set<string>();
    const cleaned: string[] = [];
    for (const raw of fonts) {
      if (typeof raw !== "string") continue;
      const f = raw.trim();
      if (!f) continue;
      const key = f.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      cleaned.push(f);
    }
    set({ customFonts: cleaned });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LS_CUSTOM_FONTS, JSON.stringify(cleaned));
      } catch {
        // ignore quota errors
      }
    }
  },

  addCustomFont: (font) => {
    const f = (font ?? "").trim();
    if (!f) return;
    const current = get().customFonts;
    if (current.some((c) => c.toLowerCase() === f.toLowerCase())) return;
    get().setCustomFonts([...current, f]);
  },

  removeCustomFont: (font) => {
    const f = (font ?? "").trim();
    if (!f) return;
    const current = get().customFonts;
    get().setCustomFonts(
      current.filter((c) => c.toLowerCase() !== f.toLowerCase()),
    );
  },

  addSnippet: (name) => {
    const snip = createSnippet(name);
    const snippets = [...get().snippets, snip];
    set({
      snippets,
      activeId: snip.id,
      html: "",
      charCount: 0,
      wordCount: 0,
      diffLines: [],
      saveState: "saved",
      lastSavedAt: snip.updatedAt,
    });
    try {
      saveVault({ snippets, activeId: snip.id, meta: get().meta });
    } catch (e) {
      set({ saveState: "unsaved" });
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
    get().toast(`Created "${snip.name}".`, "ok");
  },

  switchSnippet: (id) => {
    const snip = get().snippets.find((s) => s.id === id);
    if (!snip) return;
    set({
      activeId: id,
      html: snip.html,
      charCount: snip.html.length,
      wordCount: countWords(snip.html),
      diffLines: [],
      saveState: "saved",
      lastSavedAt: snip.updatedAt,
    });
    try {
      saveVault({ snippets: get().snippets, activeId: id, meta: get().meta });
    } catch (e) {
      set({ saveState: "unsaved" });
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
    get().refreshPreview();
  },

  renameSnippet: (id, name) => {
    const updatedAt = Date.now();
    const snippets = get().snippets.map((s) =>
      s.id === id ? { ...s, name, updatedAt } : s,
    );
    set({ snippets, saveState: "saved", lastSavedAt: updatedAt });
    try {
      saveVault({ snippets, activeId: get().activeId, meta: get().meta });
    } catch (e) {
      set({ saveState: "unsaved" });
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
  },

  deleteSnippet: (id) => {
    const snippets = get().snippets.filter((s) => s.id !== id);
    if (snippets.length === 0) {
      // Keep at least one
      const fresh = createSnippet("Untitled bio");
      snippets.push(fresh);
      set({
        snippets,
        activeId: fresh.id,
        html: "",
        charCount: 0,
        wordCount: 0,
        diffLines: [],
        saveState: "saved",
        lastSavedAt: fresh.updatedAt,
      });
    } else {
      const stillActive = get().activeId === id;
      const next = stillActive ? snippets[0] : get().snippets.find((s) => s.id === get().activeId);
      set({
        snippets,
        activeId: stillActive ? snippets[0].id : get().activeId,
        html: stillActive ? snippets[0].html : get().html,
        charCount: stillActive ? snippets[0].html.length : get().charCount,
        wordCount: stillActive ? countWords(snippets[0].html) : get().wordCount,
        saveState: "saved",
        lastSavedAt: next?.updatedAt ?? Date.now(),
      });
    }
    try {
      saveVault({
        snippets,
        activeId: get().activeId,
        meta: get().meta,
      });
    } catch (e) {
      set({ saveState: "unsaved" });
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
    get().toast("Snippet deleted.", "ok");
  },

  duplicateSnippet: (id) => {
    const src = get().snippets.find((s) => s.id === id);
    if (!src) return;
    const copy = createSnippet(src.name + " (copy)");
    copy.html = src.html;
    // Carry tags forward so labelled groupings survive duplication. History
    // is intentionally NOT copied — the duplicate starts with a clean slate.
    copy.tags = [...(src.tags ?? [])];
    const snippets = [...get().snippets, copy];
    set({
      snippets,
      activeId: copy.id,
      html: copy.html,
      charCount: copy.html.length,
      wordCount: countWords(copy.html),
      diffLines: [],
      saveState: "saved",
      lastSavedAt: copy.updatedAt,
    });
    try {
      saveVault({ snippets, activeId: copy.id, meta: get().meta });
    } catch (e) {
      set({ saveState: "unsaved" });
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
    get().toast(`Duplicated to "${copy.name}".`, "ok");
  },

  addTag: (snippetId, tag) => {
    const clean = normalizeTag(tag);
    if (!clean) return;
    const snippets = get().snippets.map((s) => {
      if (s.id !== snippetId) return s;
      const existing = s.tags ?? [];
      // De-dupe case-insensitively; preserve original casing of first occurrence.
      if (existing.some((t) => t.toLowerCase() === clean.toLowerCase())) return s;
      return { ...s, tags: [...existing, clean], updatedAt: Date.now() };
    });
    set({ snippets, saveState: "saved", lastSavedAt: Date.now() });
    try {
      saveVault({ snippets, activeId: get().activeId, meta: get().meta });
    } catch (e) {
      set({ saveState: "unsaved" });
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
  },

  removeTag: (snippetId, tag) => {
    const snippets = get().snippets.map((s) => {
      if (s.id !== snippetId) return s;
      const existing = s.tags ?? [];
      return {
        ...s,
        tags: existing.filter((t) => t.toLowerCase() !== tag.toLowerCase()),
        updatedAt: Date.now(),
      };
    });
    set({ snippets, saveState: "saved", lastSavedAt: Date.now() });
    try {
      saveVault({ snippets, activeId: get().activeId, meta: get().meta });
    } catch (e) {
      set({ saveState: "unsaved" });
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
  },

  restoreFromHistory: (snippetId, historyIndex) => {
    const snip = get().snippets.find((s) => s.id === snippetId);
    if (!snip || !snip.history || historyIndex < 0 || historyIndex >= snip.history.length) {
      return;
    }
    const entry = snip.history[historyIndex];
    // Snapshot the current html into history (it's about to be replaced) so
    // the user can undo the restore. Keep within the 5-entry cap.
    const currentSnapshot: SnippetHistoryEntry = {
      html: snip.html,
      savedAt: Date.now(),
    };
    // Drop the entry we're restoring from (it's now the live html) and push
    // the current html as the newest snapshot.
    const remainingHistory = snip.history
      .filter((_, i) => i !== historyIndex)
      .concat(currentSnapshot)
      .slice(-5);
    const restoredHtml = entry.html;
    const updatedAt = Date.now();
    const snippets = get().snippets.map((s) =>
      s.id === snippetId
        ? { ...s, html: restoredHtml, history: remainingHistory, updatedAt }
        : s,
    );
    set({
      snippets,
      html: snippetId === get().activeId ? restoredHtml : get().html,
      charCount: snippetId === get().activeId ? restoredHtml.length : get().charCount,
      wordCount:
        snippetId === get().activeId ? countWords(restoredHtml) : get().wordCount,
      saveState: "saved",
      lastSavedAt: updatedAt,
      diffLines: [],
    });
    try {
      saveVault({ snippets, activeId: get().activeId, meta: get().meta });
    } catch (e) {
      set({ saveState: "unsaved" });
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
    if (snippetId === get().activeId) {
      get().refreshPreview();
    }
    get().toast("Restored from history.", "ok");
  },

  createFromTemplate: (templateKey) => {
    const tpl = TEMPLATES[templateKey];
    if (!tpl) {
      get().toast(`Unknown template: ${templateKey}`, "error");
      return null;
    }
    const snip = createSnippet(tpl.label);
    snip.html = tpl.html;
    snip.tags = [];
    snip.history = [];
    const snippets = [...get().snippets, snip];
    set({
      snippets,
      activeId: snip.id,
      html: snip.html,
      charCount: snip.html.length,
      wordCount: countWords(snip.html),
      diffLines: [],
      saveState: "saved",
      lastSavedAt: snip.updatedAt,
    });
    try {
      saveVault({ snippets, activeId: snip.id, meta: get().meta });
    } catch (e) {
      set({ saveState: "unsaved" });
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
    get().toast(`Created "${snip.name}" from template.`, "ok");
    return snip.id;
  },

  exportVault: () => {
    return {
      version: 1,
      exportedAt: Date.now(),
      snippets: get().snippets,
      meta: get().meta,
    };
  },

  importVault: (backup, opts) => {
    const existing = get().snippets;
    const existingIds = new Set(existing.map((s) => s.id));
    let added = 0;
    let overwritten = 0;
    let skipped = 0;
    const byId = new Map(existing.map((s) => [s.id, s] as const));
    // Track incoming ids we've already seen so a backup with duplicate ids
    // doesn't double-count "added" — the second duplicate overwrites the first
    // in byId but only the first counts toward the added total.
    const seenIncomingIds = new Set<string>();
    for (const incoming of backup.snippets) {
      const isNewToVault = !existingIds.has(incoming.id);
      const isFirstOccurrence = !seenIncomingIds.has(incoming.id);
      seenIncomingIds.add(incoming.id);
      if (!isNewToVault) {
        if (opts.overwrite) {
          byId.set(incoming.id, { ...incoming, tags: incoming.tags ?? [], history: incoming.history ?? [] });
          if (isFirstOccurrence) overwritten++;
          else skipped++;
        } else {
          skipped++;
        }
      } else {
        byId.set(incoming.id, { ...incoming, tags: incoming.tags ?? [], history: incoming.history ?? [] });
        if (isFirstOccurrence) added++;
        // else: duplicate within the backup — overwrites silently, no count.
      }
    }
    const snippets = Array.from(byId.values());
    // Keep current activeId if still present; otherwise fall back to first.
    const activeId =
      get().activeId && snippets.some((s) => s.id === get().activeId)
        ? get().activeId
        : (snippets[0]?.id ?? null);
    const active = snippets.find((s) => s.id === activeId) ?? null;
    set({
      snippets,
      activeId,
      html: active?.html ?? "",
      charCount: (active?.html ?? "").length,
      wordCount: countWords(active?.html ?? ""),
      saveState: "saved",
      lastSavedAt: active?.updatedAt ?? Date.now(),
      diffLines: [],
    });
    try {
      saveVault({ snippets, activeId, meta: get().meta });
    } catch (e) {
      set({ saveState: "unsaved" });
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
    get().refreshPreview();
    return { added, overwritten, skipped };
  },

  toast: (message, kind = "note", detail, sticky = false) => {
    const id = ++toastId;
    set({ toasts: [...get().toasts, { id, message, kind, detail, sticky }] });
    const ttl = sticky ? 15000 : 4000;
    setTimeout(() => {
      set({ toasts: get().toasts.filter((t) => t.id !== id) });
    }, ttl);
  },

  dismissToast: (id) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  },
}));
