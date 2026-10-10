/**
 * Publish history — localStorage-backed log of publish attempts.
 *
 * Each entry records what was published, where it went, and whether the
 * attempt succeeded. We keep the most recent 50 entries; older entries
 * are dropped on add. The log is purely client-side and survives reloads.
 */

const LS_KEY = "forge-publish-history";
const MAX_ENTRIES = 50;

export interface PublishHistoryEntry {
  /** Unix ms when the attempt completed. */
  timestamp: number;
  /** Raw target URL the user entered (may include UUID path). */
  targetUrl: string;
  /** Resolved target kind. */
  targetKind: "character" | "script";
  /** Name of the active snippet at publish time (best-effort label). */
  snippetName: string;
  /** Whether the publish completed successfully. */
  success: boolean;
  /** HTTP status returned by the worker (or 0 if the proxy itself failed). */
  statusCode: number;
  /** Optional error message for failed attempts. */
  errorMessage?: string;
}

function isEntry(x: unknown): x is PublishHistoryEntry {
  if (!x || typeof x !== "object") return false;
  const e = x as Record<string, unknown>;
  return (
    typeof e.timestamp === "number" &&
    typeof e.targetUrl === "string" &&
    (e.targetKind === "character" || e.targetKind === "script") &&
    typeof e.snippetName === "string" &&
    typeof e.success === "boolean" &&
    typeof e.statusCode === "number"
  );
}

/**
 * Load and validate the persisted history. Returns a fresh empty array on
 * parse failure or quota errors — never throws.
 */
export function loadPublishHistory(): PublishHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isEntry);
  } catch {
    return [];
  }
}

/**
 * Prepend a new entry and trim to the last MAX_ENTRIES. Writes defensively —
 * a quota error doesn't propagate to the caller (the publish flow is the
 * critical path; the log is a nice-to-have).
 */
export function addPublishHistoryEntry(entry: PublishHistoryEntry): PublishHistoryEntry[] {
  const next = [entry, ...loadPublishHistory()].slice(0, MAX_ENTRIES);
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(next));
  } catch {
    // ignore quota / serialization errors
  }
  return next;
}

/** Wipe the log. Safe to call on the server (no-op). */
export function clearPublishHistory(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LS_KEY);
  } catch {
    // ignore
  }
}
