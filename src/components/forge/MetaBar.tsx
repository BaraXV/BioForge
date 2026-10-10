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
} from "lucide-react";
import { useState } from "react";
import AboutDialog from "./dialogs/AboutDialog";
import TokenDialog from "./dialogs/TokenDialog";
import SnippetManager from "./dialogs/SnippetManager";

export default function MetaBar() {
  const meta = useForge((s) => s.meta);
  const setMeta = useForge((s) => s.setMeta);
  const syncOn = useForge((s) => s.syncOn);
  const toggleSync = useForge((s) => s.toggleSync);
  const lineWrap = useForge((s) => s.lineWrap);
  const toggleLineWrap = useForge((s) => s.toggleLineWrap);
  const editorTheme = useForge((s) => s.editorTheme);
  const toggleEditorTheme = useForge((s) => s.toggleEditorTheme);
  const activeSnippet = useForge((s) =>
    s.snippets.find((sn) => sn.id === s.activeId),
  );

  const [aboutOpen, setAboutOpen] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [snippetsOpen, setSnippetsOpen] = useState(false);

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
          className="forge-btn ghost"
          onClick={() => setSnippetsOpen(true)}
          type="button"
          title="Open snippet library"
        >
          <FileText size={13} /> Snippets
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
          <input
            className="forge-input"
            type="password"
            placeholder="from Get Token"
            value={meta.token}
            onChange={(e) => setMeta({ token: e.target.value })}
          />
        </div>
        <button
          className="forge-btn ghost"
          onClick={() => setTokenOpen(true)}
          type="button"
        >
          <KeyRound size={13} /> Get Token
        </button>
      </div>

      <div className="forge-row" style={{ marginBottom: 0 }}>
        <span style={{ fontSize: 11, color: "var(--forge-dim)" }}>
          Active: <b style={{ color: "var(--forge-accent2)" }}>
            {activeSnippet?.name ?? "—"}
          </b>
          {" · "}
          <span id="forge-stat">
            {useForge.getState().charCount.toLocaleString()} chars
            {" · "}
            {useForge.getState().wordCount.toLocaleString()} words
          </span>
        </span>
      </div>

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
      <TokenDialog open={tokenOpen} onOpenChange={setTokenOpen} />
      <SnippetManager open={snippetsOpen} onOpenChange={setSnippetsOpen} />
    </>
  );
}
