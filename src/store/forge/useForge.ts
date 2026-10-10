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
  type Snippet,
  type VaultMeta,
} from "@/lib/forge/vault";

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

  // Preview
  previewKey: number; // bump to force refresh
  previewLabeledCount: number;
  previewWired: boolean;
  previewAccessible: boolean;

  // Diff highlights (line indices)
  diffLines: number[];

  // Toasts
  toasts: ToastItem[];

  // Hydration flag
  hydrated: boolean;

  // Actions
  hydrate: () => void;
  setHtml: (html: string) => void;
  setMeta: (partial: Partial<VaultMeta>) => void;
  toggleSync: () => void;
  toggleLineWrap: () => void;
  toggleEditorTheme: () => void;
  refreshPreview: () => void;
  setPreviewState: (s: { labeled: number; wired: boolean; accessible: boolean }) => void;
  setDiffLines: (lines: number[]) => void;
  clearDiff: () => void;

  // Snippet management (new feature)
  addSnippet: (name: string) => void;
  switchSnippet: (id: string) => void;
  renameSnippet: (id: string, name: string) => void;
  deleteSnippet: (id: string) => void;
  duplicateSnippet: (id: string) => void;

  // Toasts
  toast: (message: string, kind?: ToastItem["kind"], detail?: string, sticky?: boolean) => void;
  dismissToast: (id: number) => void;
}

let toastId = 0;

function countWords(s: string): number {
  const t = s.replace(/<[^>]*>/g, " ").trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
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

  previewKey: 0,
  previewLabeledCount: 0,
  previewWired: false,
  previewAccessible: false,

  diffLines: [],

  toasts: [],

  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    const v = loadVault();
    const active = v.snippets.find((s) => s.id === v.activeId) ?? v.snippets[0];
    set({
      snippets: v.snippets,
      activeId: active?.id ?? null,
      meta: v.meta,
      html: active?.html ?? "",
      charCount: (active?.html ?? "").length,
      wordCount: countWords(active?.html ?? ""),
      hydrated: true,
    });
  },

  setHtml: (html) => {
    const state = get();
    set({
      html,
      charCount: html.length,
      wordCount: countWords(html),
    });
    // Persist to active snippet (debounced via caller)
    if (state.activeId) {
      const snippets = state.snippets.map((s) =>
        s.id === state.activeId ? { ...s, html, updatedAt: Date.now() } : s,
      );
      try {
        saveVault({ snippets, activeId: state.activeId, meta: state.meta });
        set({ snippets });
      } catch (e) {
        get().toast(
          e instanceof Error ? e.message : "Vault save failed",
          "error",
        );
      }
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
    });
    try {
      saveVault({ snippets, activeId: snip.id, meta: get().meta });
    } catch (e) {
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
    });
    try {
      saveVault({ snippets: get().snippets, activeId: id, meta: get().meta });
    } catch (e) {
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
    get().refreshPreview();
  },

  renameSnippet: (id, name) => {
    const snippets = get().snippets.map((s) =>
      s.id === id ? { ...s, name, updatedAt: Date.now() } : s,
    );
    set({ snippets });
    try {
      saveVault({ snippets, activeId: get().activeId, meta: get().meta });
    } catch (e) {
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
      });
    } else {
      const stillActive = get().activeId === id;
      set({
        snippets,
        activeId: stillActive ? snippets[0].id : get().activeId,
        html: stillActive ? snippets[0].html : get().html,
        charCount: stillActive ? snippets[0].html.length : get().charCount,
        wordCount: stillActive ? countWords(snippets[0].html) : get().wordCount,
      });
    }
    try {
      saveVault({
        snippets,
        activeId: get().activeId,
        meta: get().meta,
      });
    } catch (e) {
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
    get().toast("Snippet deleted.", "ok");
  },

  duplicateSnippet: (id) => {
    const src = get().snippets.find((s) => s.id === id);
    if (!src) return;
    const copy = createSnippet(src.name + " (copy)");
    copy.html = src.html;
    const snippets = [...get().snippets, copy];
    set({
      snippets,
      activeId: copy.id,
      html: copy.html,
      charCount: copy.html.length,
      wordCount: countWords(copy.html),
      diffLines: [],
    });
    try {
      saveVault({ snippets, activeId: copy.id, meta: get().meta });
    } catch (e) {
      get().toast(e instanceof Error ? e.message : "Save failed", "error");
    }
    get().toast(`Duplicated to "${copy.name}".`, "ok");
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
