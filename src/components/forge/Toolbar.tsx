"use client";

import { useForge } from "@/store/forge/useForge";
import { formatSource } from "@/lib/forge/formatter";
import { lint } from "@/lib/forge/linter";
import { applyThemeToHtml } from "@/lib/forge/themes";
import {
  parseTarget,
  parseTargetList,
  buildLoadScript,
} from "@/lib/forge/publisher";
import { computeDiff } from "@/lib/forge/diff";
import { runSelfTest } from "@/lib/forge/selfTest";
import {
  addPublishHistoryEntry,
  type PublishHistoryEntry,
} from "@/lib/forge/publishHistory";
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
  ClipboardPaste,
  History,
  Pipette,
  Smile,
  Type,
} from "lucide-react";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import DiffDialog from "./dialogs/DiffDialog";
import SelfTestDialog from "./dialogs/SelfTestDialog";
import ScriptDialog from "./dialogs/ScriptDialog";
import PublishDialog from "./dialogs/PublishDialog";
import ColorPickerDialog from "./dialogs/ColorPickerDialog";
import EmojiPickerDialog from "./dialogs/EmojiPickerDialog";
import FontLoaderDialog from "./dialogs/FontLoaderDialog";

// Toolbar takes no props — the About and Token dialogs are opened by MetaBar.
// The props were a leftover from an earlier architecture where Toolbar owned
// them.
export default function Toolbar() {
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
  const publishMode = useForge((s) => s.publishMode);
  const setPublishMode = useForge((s) => s.setPublishMode);
  const activeSnippet = useForge((s) =>
    s.snippets.find((sn) => sn.id === s.activeId),
  );

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
  const [publishHistoryOpen, setPublishHistoryOpen] = useState(false);
  // Multi-target progress indicator: {current, total} while iterating, else null.
  const [publishProgress, setPublishProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);

  // Visual / theming dialogs (color picker, emoji picker, custom font loader)
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [fontLoaderOpen, setFontLoaderOpen] = useState(false);

  /**
   * Parse the target URL field into a list of {url, target} pairs. Empty/
   * invalid URLs are filtered out. Used by the multi-target publish flow and
   * to drive the count badge + draft/published toggle enable state.
   */
  const detectedTargets = useMemo(() => {
    const urls = parseTargetList(meta.target);
    return urls
      .map((url) => ({ url, target: parseTarget(url) }))
      .filter((x) => x.target !== null);
  }, [meta.target]);

  const targetCount = detectedTargets.length;
  // The draft/published toggle is only meaningful for script targets. If
  // every detected target is a character (or there are none yet), leave it
  // enabled when empty but disable when all-known are characters.
  const modeToggleDisabled =
    targetCount > 0 &&
    detectedTargets.every((x) => x.target?.kind === "character");

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
    // Use the first valid target in the (possibly comma-separated) target
    // field. The Load Current script fetches ONE bio at a time, so even if
    // multiple targets are present we only build a script for the first one
    // — the dialog note tells the user which URL was used.
    const urls = parseTargetList(meta.target);
    const firstTarget = urls.length > 0 ? parseTarget(urls[0]) : null;
    if (!firstTarget) {
      toast("Target URL has no UUID.", "error");
      return;
    }
    if (!meta.token.trim()) {
      toast("Paste your token first.", "error");
      return;
    }
    const script = buildLoadScript(firstTarget, meta.token.trim());
    const note =
      urls.length > 1
        ? `Multiple targets detected — building the script for the first one (${firstTarget.kind}: …${firstTarget.uuid.slice(-8)}). Run on any janitorai.com tab, copy between the markers, then close this dialog.`
        : "Run on any janitorai.com tab. Copy between the markers, then close this dialog.";
    setScriptState({
      title: "Load Current (for Compare)",
      note,
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

  /**
   * Publish to a single target URL via the proxy. Returns the result so the
   * caller can aggregate per-target outcomes for the multi-target flow and
   * the publish history log.
   */
  const publishOne = useCallback(
    async (
      url: string,
      targetKind: "character" | "script",
    ): Promise<{
      success: boolean;
      statusCode: number;
      errorMessage?: string;
    }> => {
      try {
        const res = await fetch("/api/forge/publish", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            url,
            token: meta.token.trim(),
            html: htmlContent,
            // Characters don't have a draft/published distinction — only
            // forward the mode for script targets.
            publishMode: targetKind === "script" ? publishMode : "both",
          }),
        });
        const data = await res.json().catch(() => ({
          ok: false,
          status: res.status,
          response: "Unparseable response",
        }));
        const statusCode =
          (typeof data.status === "number" && data.status) || res.status;
        if (data.ok) {
          return { success: true, statusCode };
        }
        const errorMessage =
          (typeof data.error === "string" && data.error) ||
          (typeof data.response === "string" && data.response.slice(0, 200)) ||
          `rejected (${statusCode})`;
        return { success: false, statusCode, errorMessage };
      } catch (e) {
        return {
          success: false,
          statusCode: 0,
          errorMessage:
            e instanceof Error ? e.message : "Could not reach publish proxy",
        };
      }
    },
    [meta.token, htmlContent, publishMode],
  );

  const handlePublish = useCallback(async () => {
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
    // Resolve every URL in the target field to a parsed target. Skip any
    // that don't match a character/script UUID.
    const targets = detectedTargets;
    if (targets.length === 0) {
      toast("Target URL has no character/script UUID.", "error");
      return;
    }

    const snippetName = activeSnippet?.name ?? "";
    setPublishing(true);
    setPublishProgress({ current: 0, total: targets.length });

    let okCount = 0;
    const failedUuids: string[] = [];
    try {
      for (let i = 0; i < targets.length; i++) {
        const { url, target } = targets[i];
        // Defensive — filter() above guarantees non-null but TS doesn't narrow it.
        if (!target) continue;
        setPublishProgress({ current: i + 1, total: targets.length });

        const result = await publishOne(url, target.kind);

        const entry: PublishHistoryEntry = {
          timestamp: Date.now(),
          targetUrl: url,
          targetKind: target.kind,
          snippetName,
          success: result.success,
          statusCode: result.statusCode,
          errorMessage: result.errorMessage,
        };
        addPublishHistoryEntry(entry);

        if (result.success) {
          okCount++;
        } else {
          failedUuids.push(target.uuid);
        }
      }

      if (targets.length === 1) {
        // Single-target: keep the existing toast copy for parity.
        if (okCount === 1) {
          toast("Published. Open the page to verify.", "ok");
        } else {
          const fail = failedUuids[0] ?? "";
          toast(
            `JAI rejected the publish${fail ? ` (${fail})` : ""}.`,
            "error",
            undefined,
            true,
          );
        }
      } else {
        // Multi-target: summary toast.
        const summary =
          `Published ${okCount}/${targets.length} successfully.` +
          (failedUuids.length
            ? ` ${failedUuids.length} failed: ${failedUuids.join(", ")}`
            : "");
        toast(summary, okCount === targets.length ? "ok" : "error", undefined, true);
      }
    } finally {
      setPublishing(false);
      setPublishProgress(null);
    }
  }, [
    meta.token,
    htmlContent,
    detectedTargets,
    activeSnippet,
    toast,
    publishOne,
  ]);

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

  const handlePasteClipboard = useCallback(async () => {
    // Older browsers (or insecure contexts) may not expose navigator.clipboard.
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      toast(
        "Clipboard API unavailable in this browser — paste manually with Ctrl+V.",
        "note",
      );
      return;
    }
    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        toast("Clipboard is empty.", "note");
        return;
      }
      const inserter = (
        window as unknown as { __forgeInsertText?: (text: string) => void }
      ).__forgeInsertText;
      if (inserter) {
        inserter(text);
        toast(
          `Pasted ${text.length.toLocaleString()} char${text.length !== 1 ? "s" : ""} from clipboard.`,
          "ok",
        );
      } else {
        // Fallback: append to the editor html if the editor hasn't mounted yet.
        setHtml(htmlContent + text);
        toast(
          `Pasted ${text.length.toLocaleString()} char${text.length !== 1 ? "s" : ""} (appended — editor not ready).`,
          "ok",
        );
      }
    } catch {
      toast(
        "Clipboard access denied — paste manually with Ctrl+V.",
        "error",
      );
    }
  }, [htmlContent, setHtml, toast]);

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
        <button
          className="forge-btn ghost"
          onClick={handlePasteClipboard}
          type="button"
          title="Paste from system clipboard at the cursor"
        >
          <ClipboardPaste size={13} /> Paste from Clipboard
        </button>
        <button
          className="forge-btn ghost"
          onClick={() => setColorPickerOpen(true)}
          type="button"
          title="Open color picker — insert hex at cursor"
        >
          <Pipette size={13} /> Color
        </button>
        <button
          className="forge-btn ghost"
          onClick={() => setEmojiPickerOpen(true)}
          type="button"
          title="Open symbol & special character picker"
        >
          <Smile size={13} /> Symbols
        </button>
        <button
          className="forge-btn ghost"
          onClick={() => setFontLoaderOpen(true)}
          type="button"
          title="Load custom Google Fonts into the preview"
        >
          <Type size={13} /> Fonts
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".html,.htm,.txt"
          onChange={handleImportFile}
          style={{ display: "none" }}
        />
        <span className="forge-spacer" />
        {targetCount > 1 && (
          <span
            className="forge-target-count"
            title={`${targetCount} valid targets detected — same HTML will be published to each`}
          >
            {targetCount} targets
          </span>
        )}
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
        <fieldset
          className="forge-publish-mode"
          disabled={modeToggleDisabled || publishing}
          aria-label="Draft vs published mode"
          title={
            modeToggleDisabled
              ? "Draft/published toggle only applies to script targets"
              : "Choose which content slot(s) to write for script targets"
          }
        >
          <legend>Mode</legend>
          <label>
            <input
              type="radio"
              name="forge-publish-mode"
              value="both"
              checked={publishMode === "both"}
              onChange={() => setPublishMode("both")}
            />
            <span>Both</span>
          </label>
          <label>
            <input
              type="radio"
              name="forge-publish-mode"
              value="draft"
              checked={publishMode === "draft"}
              onChange={() => setPublishMode("draft")}
            />
            <span>Draft</span>
          </label>
          <label>
            <input
              type="radio"
              name="forge-publish-mode"
              value="published"
              checked={publishMode === "published"}
              onChange={() => setPublishMode("published")}
            />
            <span>Pub</span>
          </label>
        </fieldset>
        <button
          className="forge-btn ghost"
          onClick={() => setPublishHistoryOpen(true)}
          type="button"
          title="Open publish history"
        >
          <History size={13} /> History
        </button>
        <button
          className="forge-btn ember"
          onClick={handlePublish}
          disabled={publishing}
          type="button"
        >
          <Zap size={13} />{" "}
          {publishing
            ? publishProgress
              ? `Publishing ${publishProgress.current}/${publishProgress.total}…`
              : "Publishing…"
            : "Publish"}
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
      <PublishDialog open={publishHistoryOpen} onOpenChange={setPublishHistoryOpen} />
      <ColorPickerDialog open={colorPickerOpen} onOpenChange={setColorPickerOpen} />
      <EmojiPickerDialog open={emojiPickerOpen} onOpenChange={setEmojiPickerOpen} />
      <FontLoaderDialog open={fontLoaderOpen} onOpenChange={setFontLoaderOpen} />
    </>
  );
}
