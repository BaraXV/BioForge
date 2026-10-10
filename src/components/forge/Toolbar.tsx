"use client";

import { useForge } from "@/store/forge/useForge";
import { formatSource } from "@/lib/forge/formatter";
import { lint } from "@/lib/forge/linter";
import { applyThemeToHtml } from "@/lib/forge/themes";
import { parseTarget, buildLoadScript } from "@/lib/forge/publisher";
import { computeDiff } from "@/lib/forge/diff";
import { runSelfTest } from "@/lib/forge/selfTest";
import {
  Download,
  Upload,
  Sparkles,
  RefreshCw,
  GitCompare,
  Bug,
  Trash2,
  Zap,
  Wand2,
  Search,
} from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import DiffDialog from "./dialogs/DiffDialog";
import SelfTestDialog from "./dialogs/SelfTestDialog";
import ScriptDialog from "./dialogs/ScriptDialog";

interface ToolbarProps {
  onOpenAbout: () => void;
  onOpenToken: () => void;
}

export default function Toolbar({ onOpenAbout, onOpenToken }: ToolbarProps) {
  const htmlContent = useForge((s) => s.html);
  const setHtml = useForge((s) => s.setHtml);
  const toast = useForge((s) => s.toast);
  const refreshPreview = useForge((s) => s.refreshPreview);
  const clearDiff = useForge((s) => s.clearDiff);
  const setDiffLines = useForge((s) => s.setDiffLines);
  const meta = useForge((s) => s.meta);
  const setMeta = useForge((s) => s.setMeta);
  const previewLabeledCount = useForge((s) => s.previewLabeledCount);
  const previewWired = useForge((s) => s.previewWired);
  const previewAccessible = useForge((s) => s.previewAccessible);

  const [diffOpen, setDiffOpen] = useState(false);
  const [selfTestOpen, setSelfTestOpen] = useState(false);
  const [selfTestReport, setSelfTestReport] = useState<
    ReturnType<typeof runSelfTest> | null
  >(null);
  const [scriptOpen, setScriptOpen] = useState(false);
  const [scriptState, setScriptState] = useState<{
    title: string;
    note: string;
    body: string;
  }>({ title: "", note: "", body: "" });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [publishing, setPublishing] = useState(false);

  const handleFormat = useCallback(() => {
    const result = formatSource(htmlContent);
    if (result === htmlContent) {
      toast("Already formatted.", "ok");
      return;
    }
    setHtml(result);
    toast("Formatted (block-level only — inline tags preserved inline).", "ok");
  }, [htmlContent, setHtml, toast]);

  const handleLint = useCallback(() => {
    const problems = lint(htmlContent);
    if (problems.length === 0) {
      toast("Lint clean — sanitizer rules and house doctrine both pass.", "ok");
    } else {
      toast(
        `Lint found ${problems.length} issue(s):`,
        "error",
        problems.map((p) => `[${p.severity}] ${p.message}`).join("\n"),
        true,
      );
    }
  }, [htmlContent, toast]);

  const handleClear = useCallback(() => {
    if (htmlContent.trim()) {
      if (!window.confirm("Clear the editor? The vault keeps the last saved copy.")) {
        return;
      }
    }
    setHtml("");
    refreshPreview();
    toast("Editor cleared.", "ok");
  }, [htmlContent, setHtml, refreshPreview, toast]);

  const handleExport = useCallback(() => {
    if (!htmlContent.trim()) {
      toast("Editor is empty — nothing to export.", "error");
      return;
    }
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    a.download = `forge-bio-${stamp}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast("Exported as standalone HTML file.", "ok");
  }, [htmlContent, toast]);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImportFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result ?? "");
        setHtml(text);
        toast(`Imported "${file.name}" (${text.length.toLocaleString()} chars).`, "ok");
      };
      reader.onerror = () => toast("Failed to read file.", "error");
      reader.readAsText(file);
      e.target.value = "";
    },
    [setHtml, toast],
  );

  const handleLoadCurrent = useCallback(() => {
    const t = parseTarget(meta.target);
    if (!t) {
      toast("Target URL has no UUID.", "error");
      return;
    }
    if (!meta.token.trim()) {
      toast("Paste your token first.", "error");
      return;
    }
    const script = buildLoadScript(t, meta.token.trim());
    setScriptState({
      title: "Load Current (for Compare)",
      note: "Run on any janitorai.com tab. Copy between the markers, then close this dialog.",
      body: script,
    });
    setScriptOpen(true);
    // After the user closes the script dialog, open the diff dialog
  }, [meta.target, meta.token, toast]);

  const handleRunDiff = useCallback(
    (liveText: string) => {
      const live = liveText.trim();
      if (!live) {
        toast("Paste the live bio content first.", "error");
        return;
      }
      const result = computeDiff(htmlContent, live);
      setDiffLines(result.addedLines);
      toast(
        `${result.addedCount} line(s) highlighted (added/changed — deletions not shown). Editing or Refresh clears.`,
        result.addedCount ? "ok" : "note",
      );
    },
    [htmlContent, setDiffLines, toast],
  );

  const handleSelfTest = useCallback(() => {
    const report = runSelfTest({
      editorHtml: htmlContent,
      previewLabeledCount,
      previewWired,
      previewAccessible,
    });
    setSelfTestReport(report);
    setSelfTestOpen(true);
    toast(
      report.allNominal
        ? `Self-Test: ${report.passed}/${report.total} — all nominal.`
        : `Self-Test: ${report.total - report.passed} FAILURE(S) — panel open.`,
      report.allNominal ? "ok" : "error",
    );
  }, [
    htmlContent,
    previewLabeledCount,
    previewWired,
    previewAccessible,
    toast,
  ]);

  const handlePublish = useCallback(async () => {
    const t = parseTarget(meta.target);
    if (!t) {
      toast("Target URL has no character/script UUID.", "error");
      return;
    }
    if (!meta.token.trim()) {
      toast("Paste your access token first.", "error");
      return;
    }
    if (!htmlContent.trim()) {
      toast("Editor is empty.", "error");
      return;
    }
    if (/z-index/i.test(htmlContent)) {
      toast("HTML contains z-index — remove it first.", "error");
      return;
    }
    setPublishing(true);
    try {
      // Publish via a Next.js API route (proxy) to avoid CORS.
      const res = await fetch("/api/forge/publish?XTransformPort=3000", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          url: meta.target.trim(),
          token: meta.token.trim(),
          html: htmlContent,
        }),
      });
      const data = await res.json().catch(() => ({
        ok: false,
        status: res.status,
        response: "Unparseable response",
      }));
      if (data.ok) {
        toast(
          `Published (${data.target || "ok"}). Open the page to verify.`,
          "ok",
        );
      } else {
        toast(
          `JAI rejected the publish (${data.status || res.status}).`,
          "error",
          JSON.stringify(data.response || data.error || data).slice(0, 600),
          true,
        );
      }
    } catch (e) {
      toast(
        "Could not reach the publish proxy: " + (e instanceof Error ? e.message : String(e)),
        "error",
        undefined,
        true,
      );
    } finally {
      setPublishing(false);
    }
  }, [meta.target, meta.token, htmlContent, toast]);

  // Listen for keyboard shortcut events dispatched by ForgeApp
  useEffect(() => {
    const onFormat = () => handleFormat();
    const onLint = () => handleLint();
    const onPublish = () => handlePublish();
    document.addEventListener("forge:format", onFormat);
    document.addEventListener("forge:lint", onLint);
    document.addEventListener("forge:publish", onPublish);
    return () => {
      document.removeEventListener("forge:format", onFormat);
      document.removeEventListener("forge:lint", onLint);
      document.removeEventListener("forge:publish", onPublish);
    };
  }, [handleFormat, handleLint, handlePublish]);

  const handleApplyTheme = useCallback(
    (name: string) => {
      if (!name) {
        toast("Theme cleared — nothing changed.", "ok");
        return;
      }
      if (!htmlContent.trim()) {
        toast("Editor is empty — paste a bio first.", "error");
        return;
      }
      const result = applyThemeToHtml(htmlContent, name);
      if (!result) {
        toast("Unknown theme.", "error");
        return;
      }
      setHtml(result.html);
      toast(
        `Re-skinned: ${name}. ${result.remappedCount} color slots remapped. Ctrl+Z reverts.`,
        "ok",
      );
    },
    [htmlContent, setHtml, toast],
  );

  return (
    <>
      <div className="forge-row" style={{ marginTop: 0 }}>
        <button className="forge-btn ghost" onClick={handleFormat} type="button">
          <Wand2 size={13} /> Format
        </button>
        <button className="forge-btn ghost" onClick={handleLint} type="button">
          <Search size={13} /> Lint
        </button>
        <button className="forge-btn ghost" onClick={handleLoadCurrent} type="button">
          <RefreshCw size={13} /> Load Current
        </button>
        <button
          className="forge-btn ghost"
          onClick={() => {
            refreshPreview();
            clearDiff();
            toast("Preview reloaded fresh.", "ok");
          }}
          type="button"
        >
          <RefreshCw size={13} /> Refresh Preview
        </button>
        <button
          className="forge-btn ghost"
          onClick={() => setDiffOpen(true)}
          type="button"
        >
          <GitCompare size={13} /> Compare
        </button>
        <button className="forge-btn ghost" onClick={handleSelfTest} type="button">
          <Bug size={13} /> Self-Test
        </button>
        <button className="forge-btn ghost" onClick={handleClear} type="button">
          <Trash2 size={13} /> Clear
        </button>
        {/* New features */}
        <button className="forge-btn ghost" onClick={handleExport} type="button">
          <Download size={13} /> Export
        </button>
        <button className="forge-btn ghost" onClick={handleImportClick} type="button">
          <Upload size={13} /> Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".html,.htm,.txt"
          onChange={handleImportFile}
          style={{ display: "none" }}
        />
        <span className="forge-spacer" />
        <select
          className="forge-select"
          style={{ flex: "0 1 180px" }}
          value=""
          onChange={(e) => {
            if (e.target.value) handleApplyTheme(e.target.value);
            e.target.value = "";
          }}
          aria-label="Apply bio theme"
        >
          <option value="">✨ Apply theme…</option>
          <option value="gothic">Gothic Steel</option>
          <option value="gold">Gold Obsidian</option>
          <option value="ember">Dossier Ember</option>
          <option value="minimal">Minimal Ephemera</option>
        </select>
        <button className="forge-btn ember" onClick={handlePublish} disabled={publishing} type="button">
          <Zap size={13} /> {publishing ? "Publishing..." : "Publish"}
        </button>
      </div>

      <DiffDialog
        open={diffOpen}
        onOpenChange={setDiffOpen}
        onRunDiff={handleRunDiff}
      />
      <SelfTestDialog
        open={selfTestOpen}
        onOpenChange={setSelfTestOpen}
        report={selfTestReport}
      />
      <ScriptDialog
        open={scriptOpen}
        onOpenChange={(o) => {
          setScriptOpen(o);
          if (!o) setDiffOpen(true);
        }}
        title={scriptState.title}
        note={scriptState.note}
        body={scriptState.body}
      />
    </>
  );
}
