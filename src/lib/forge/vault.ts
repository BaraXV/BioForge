/**
 * Vault — localStorage persistence with multi-snippet support (new feature).
 *
 * The original BioForge stored a single bio. This version supports a named
 * snippet library so the user can keep multiple bios and switch between them.
 * Backward-compatible: imports the old `forge-html` key on first load.
 */

const LS_SNIPPETS = "forge-snippets";
const LS_ACTIVE = "forge-active-snippet";
const LS_META = "forge-meta";
const LS_BACKUP = "forge-html-backup"; // legacy

export interface SnippetHistoryEntry {
  html: string;
  savedAt: number;
}

export interface Snippet {
  id: string;
  name: string;
  html: string;
  updatedAt: number;
  /** Optional user-defined tags for filtering and grouping. */
  tags?: string[];
  /** Optional recent version snapshots (max 5 entries). Older entries live at lower indices. */
  history?: SnippetHistoryEntry[];
}

export interface VaultMeta {
  target: string;
  token: string;
  theme: string;
  saved: number;
}

export interface VaultData {
  snippets: Snippet[];
  activeId: string | null;
  meta: VaultMeta;
}

/** Shape of the JSON file produced by Export All / consumed by Import Backup. */
export interface VaultBackup {
  version: 1;
  exportedAt: number;
  snippets: Snippet[];
  meta: VaultMeta;
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Defensive normalizer — ensures every snippet has well-formed optional fields
 * so downstream code can safely assume `tags` and `history` are arrays (even
 * when absent from older persisted data). Also coerces `html`/`name`/`id` to
 * strings and filters malformed history entries so a corrupted vault entry
 * can't crash the editor.
 */
function normalizeSnippet(s: Partial<Snippet>): Snippet {
  const history: SnippetHistoryEntry[] = Array.isArray(s.history)
    ? s.history.filter(
        (h): h is SnippetHistoryEntry =>
          !!h &&
          typeof h === "object" &&
          typeof (h as Partial<SnippetHistoryEntry>).html === "string" &&
          typeof (h as Partial<SnippetHistoryEntry>).savedAt === "number",
      )
    : [];
  return {
    id: typeof s.id === "string" ? s.id : "",
    name: typeof s.name === "string" ? s.name : "Untitled bio",
    html: typeof s.html === "string" ? s.html : "",
    updatedAt: typeof s.updatedAt === "number" ? s.updatedAt : Date.now(),
    tags: Array.isArray(s.tags) ? s.tags.filter((t) => typeof t === "string") : [],
    history,
  };
}

export function loadVault(): VaultData {
  if (typeof window === "undefined") {
    return {
      snippets: [],
      activeId: null,
      meta: { target: "", token: "", theme: "", saved: 0 },
    };
  }

  let snippets = safeParse<Snippet[]>(localStorage.getItem(LS_SNIPPETS), []).map(
    normalizeSnippet,
  );
  let activeId = localStorage.getItem(LS_ACTIVE);

  // Migrate legacy single-bio storage on first load
  if (snippets.length === 0) {
    const legacy = localStorage.getItem("forge-html") || localStorage.getItem(LS_BACKUP) || "";
    if (legacy.trim()) {
      const snip: Snippet = {
        id: "migrated",
        name: "Migrated bio",
        html: legacy,
        updatedAt: Date.now(),
      };
      snippets = [snip];
      activeId = snip.id;
      localStorage.setItem(LS_SNIPPETS, JSON.stringify(snippets));
      localStorage.setItem(LS_ACTIVE, activeId);
    }
  }

  // Ensure there is always at least one snippet
  if (snippets.length === 0) {
    const snip: Snippet = {
      id: "default",
      name: "Untitled bio",
      html: "",
      updatedAt: Date.now(),
    };
    snippets = [snip];
    activeId = snip.id;
  }
  if (!activeId || !snippets.find((s) => s.id === activeId)) {
    activeId = snippets[0].id;
  }

  const meta = safeParse<VaultMeta>(localStorage.getItem(LS_META), {
    target: "",
    token: "",
    theme: "",
    saved: 0,
  });

  return { snippets, activeId, meta };
}

export function saveVault(data: VaultData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_SNIPPETS, JSON.stringify(data.snippets));
    localStorage.setItem(LS_ACTIVE, data.activeId ?? "");
    localStorage.setItem(
      LS_META,
      JSON.stringify({ ...data.meta, saved: Date.now() }),
    );
  } catch (e) {
    throw new Error(
      "Vault: could not save — storage blocked or quota exceeded. " +
        (e instanceof Error ? e.message : ""),
    );
  }
}

export function createSnippet(name: string): Snippet {
  return {
    id: "snip-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7),
    name: name || "Untitled bio",
    html: "",
    updatedAt: Date.now(),
    tags: [],
    history: [],
  };
}

/**
 * Parse and validate a backup JSON blob produced by Export All. Tolerates
 * missing fields and trims to the canonical Snippet shape via normalizeSnippet.
 * Returns null if the payload is fundamentally malformed.
 */
export function parseBackup(text: string): VaultBackup | null {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const obj = data as Partial<VaultBackup>;
  if (!Array.isArray(obj.snippets)) return null;
  const snippets = obj.snippets
    .filter((s): s is Snippet => !!s && typeof s === "object" && typeof s.id === "string")
    .map(normalizeSnippet);
  const meta: VaultMeta = {
    target: typeof obj.meta?.target === "string" ? obj.meta.target : "",
    token: typeof obj.meta?.token === "string" ? obj.meta.token : "",
    theme: typeof obj.meta?.theme === "string" ? obj.meta.theme : "",
    saved: typeof obj.meta?.saved === "number" ? obj.meta.saved : 0,
  };
  return {
    version: 1,
    exportedAt: typeof obj.exportedAt === "number" ? obj.exportedAt : Date.now(),
    snippets,
    meta,
  };
}
