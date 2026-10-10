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

export interface Snippet {
  id: string;
  name: string;
  html: string;
  updatedAt: number;
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

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadVault(): VaultData {
  if (typeof window === "undefined") {
    return {
      snippets: [],
      activeId: null,
      meta: { target: "", token: "", theme: "", saved: 0 },
    };
  }

  let snippets = safeParse<Snippet[]>(localStorage.getItem(LS_SNIPPETS), []);
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
  };
}
