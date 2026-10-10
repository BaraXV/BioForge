"use client";

import { useForge } from "@/store/forge/useForge";
import {
  Hexagon,
  HelpCircle,
  KeyRound,
  FileText,
  ArrowUpDown,
  WrapText,
  Sun,
  Moon,
  Clock,
  Keyboard,
  Palette,
} from "lucide-react";
import { useEffect, useState } from "react";
import AboutDialog from "./dialogs/AboutDialog";
import TokenDialog from "./dialogs/TokenDialog";
import SnippetManager from "./dialogs/SnippetManager";
import RecentEditsDialog from "./dialogs/RecentEditsDialog";
import ShortcutsDialog from "./dialogs/ShortcutsDialog";
import { decodeJwtExp } from "@/lib/forge/publisher";

/** Format a relative-time string: "Xs ago", "Xm ago", "Xh ago". */
function relativeTime(fromTs: number, nowMs: number): string {
  if (!fromTs) return "never";
  const diff = Math.max(0, Math.floor((nowMs - fromTs) / 1000));
  if (diff < 5) return "just now";
  if (diff < 60) return `${diff}s ago`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

/** Threshold (seconds before expiry) at which the warning badge appears. */
const EXPIRY_WARN_SECONDS = 10 * 60;

/**
 * JWT expiry badge — appears next to the Access Token field. Re-checks the
 * token's `exp` claim every 30 seconds and on every token change.
 *
 *  - already expired → red "expired Xs ago" badge
 *  - expires within 10 minutes → yellow "expires in Xm" badge
 *  - otherwise → no badge
 *
 * Returns null when the token is absent or not a parseable JWT.
 */
function TokenExpiryBadge({ token }: { token: string }) {
  // `nowTick` is bumped on a 30s interval so the badge refreshes in real
  // time without re-rendering the whole MetaBar. The interval is reset only
  // when the component unmounts (token changes are handled by the parent's
  // re-render, which re-evaluates the JSX below with the current nowTick).
  const [nowTick, setNowTick] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNowTick(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const trimmed = token.trim();
  if (!trimmed) return null;
  const exp = decodeJwtExp(trimmed);
  if (exp === null) return null;
  const nowSec = Math.floor(nowTick / 1000);
  const remaining = exp - nowSec;
  if (remaining <= 0) {
    const ago = relativeTime(exp * 1000, nowTick);
    return (
      <span
        className="forge-token-expiry expired"
        title={`Token expired ${ago}. Repaste a fresh token from the Get Token dialog.`}
      >
        expired {ago}
      </span>
    );
  }
  if (remaining <= EXPIRY_WARN_SECONDS) {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    const label = m > 0 ? `expires in ${m}m` : `expires in ${s}s`;
    return (
      <span
        className="forge-token-expiry soon"
        title={`Token ${label}. Repaste soon to avoid publish failures.`}
      >
        {label}
      </span>
    );
  }
  return null;
}

export default function MetaBar() {
  const meta = useForge((s) => s.meta);
  const setMeta = useForge((s) => s.setMeta);
  const syncOn = useForge((s) => s.syncOn);
  const toggleSync = useForge((s) => s.toggleSync);
  const lineWrap = useForge((s) => s.lineWrap);
  const toggleLineWrap = useForge((s) => s.toggleLineWrap);
  const editorTheme = useForge((s) => s.editorTheme);
  const toggleEditorTheme = useForge((s) => s.toggleEditorTheme);
  const appTheme = useForge((s) => s.appTheme);
  const toggleAppTheme = useForge((s) => s.toggleAppTheme);
  const activeSnippet = useForge((s) =>
    s.snippets.find((sn) => sn.id === s.activeId),
  );
  const saveState = useForge((s) => s.saveState);
  const lastSavedAt = useForge((s) => s.lastSavedAt);
  const charCount = useForge((s) => s.charCount);
  const wordCount = useForge((s) => s.wordCount);

  const [aboutOpen, setAboutOpen] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [snippetsOpen, setSnippetsOpen] = useState(false);
  const [recentOpen, setRecentOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Tick once per second so the "saved Xs ago" relative time stays fresh.
  // Only runs while the component is mounted; cheap.
  const [, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Open the shortcuts dialog when ForgeApp dispatches the `?` keyboard event.
  useEffect(() => {
    const onShortcuts = () => setShortcutsOpen(true);
    document.addEventListener("forge:shortcuts", onShortcuts);
    return () => document.removeEventListener("forge:shortcuts", onShortcuts);
  }, []);

  const indicatorLabel = (() => {
    if (saveState === "saving") return "saving…";
    if (saveState === "unsaved") return "unsaved changes";
    return `saved ${relativeTime(lastSavedAt, Date.now())}`;
  })();

  const indicatorClass = `forge-save-indicator state-${saveState}`;

  return (
    <>
      <header className="forge-header">
        <h1>
          <Hexagon size={20} style={{ display: "inline", verticalAlign: "-3px", marginRight: 4 }} />
          JAI FORGE
        </h1>
        <span className="tag">v1.0 · Next.js edition</span>
        <span className="forge-spacer" />
        <button
          className={`forge-btn ghost ${syncOn ? "on" : ""}`}
          onClick={toggleSync}
          type="button"
          title="Toggle sync scroll between editor and preview"
        >
          <ArrowUpDown size={13} /> Sync: {syncOn ? "ON" : "OFF"}
        </button>
        <button
          className={`forge-btn ghost ${lineWrap ? "on" : ""}`}
          onClick={toggleLineWrap}
          type="button"
          title="Toggle line wrapping in the editor"
        >
          <WrapText size={13} /> Wrap: {lineWrap ? "ON" : "OFF"}
        </button>
        <button
          className="forge-btn ghost"
          onClick={toggleEditorTheme}
          type="button"
          title="Toggle editor color theme"
        >
          {editorTheme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          {editorTheme === "dark" ? "Light" : "Dark"}
        </button>
        <button
          className={`forge-btn ghost ${appTheme === "light" ? "on" : ""}`}
          onClick={toggleAppTheme}
          type="button"
          title={`App theme: ${appTheme} (click to switch)`}
          aria-label={`Toggle app theme (currently ${appTheme})`}
        >
          <Palette size={13} /> App: {appTheme === "dark" ? "Dark" : "Light"}
        </button>
        <button
          className="forge-btn ghost"
          onClick={() => setSnippetsOpen(true)}
          type="button"
          title="Open snippet library"
        >
          <FileText size={13} /> Snippets
        </button>
        <button
          className="forge-btn ghost"
          onClick={() => setRecentOpen(true)}
          type="button"
          title="Recent edits (10 most recently modified snippets)"
        >
          <Clock size={13} /> Recent
        </button>
        <button
          className="forge-btn ghost"
          onClick={() => setShortcutsOpen(true)}
          type="button"
          title="Keyboard shortcuts (? on keyboard)"
          aria-label="Keyboard shortcuts"
        >
          <Keyboard size={13} />
        </button>
        <button
          className="forge-btn ghost"
          onClick={() => setAboutOpen(true)}
          type="button"
          title="About JAI FORGE"
          aria-label="About"
        >
          <HelpCircle size={13} />
        </button>
      </header>

      <div className="forge-row">
        <div className="forge-field">
          <label>Target URL</label>
          <input
            className="forge-input"
            type="text"
            placeholder="https://janitorai.com/characters/UUID..."
            value={meta.target}
            onChange={(e) => setMeta({ target: e.target.value })}
          />
        </div>
        <div className="forge-field" style={{ flex: "0 1 260px" }}>
          <label>Access Token</label>
          <div className="forge-token-field">
            <input
              className="forge-input"
              type="password"
              placeholder="from Get Token"
              value={meta.token}
              onChange={(e) => setMeta({ token: e.target.value })}
            />
            <TokenExpiryBadge token={meta.token} />
          </div>
        </div>
        <button
          className="forge-btn ghost"
          onClick={() => setTokenOpen(true)}
          type="button"
        >
          <KeyRound size={13} /> Get Token
        </button>
      </div>

      <div className="forge-row" style={{ marginBottom: 0, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "var(--forge-dim)" }}>
          Active: <b style={{ color: "var(--forge-accent2)" }}>
            {activeSnippet?.name ?? "—"}
          </b>
          {" · "}
          <span id="forge-stat">
            {charCount.toLocaleString()} chars
            {" · "}
            {wordCount.toLocaleString()} words
          </span>
        </span>
        <span
          className={indicatorClass}
          title={
            saveState === "saved" && lastSavedAt
              ? `Last saved at ${new Date(lastSavedAt).toLocaleTimeString()}`
              : undefined
          }
        >
          <span className="forge-save-dot" aria-hidden />
          {indicatorLabel}
        </span>
      </div>

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
      <TokenDialog open={tokenOpen} onOpenChange={setTokenOpen} />
      <SnippetManager open={snippetsOpen} onOpenChange={setSnippetsOpen} />
      <RecentEditsDialog open={recentOpen} onOpenChange={setRecentOpen} />
      <ShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </>
  );
}
