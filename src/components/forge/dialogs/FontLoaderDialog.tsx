"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Type, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useForge } from "@/store/forge/useForge";

interface FontLoaderDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

/** The Google Fonts CSS2 URL lives inside the preview iframe's shell. The
 *  shell is rebuilt whenever the custom-fonts list changes (see PreviewPane),
 *  so this dialog just needs to mutate the store and let the iframe re-render.
 *
 *  We construct a <link> preview here purely to show the user what will be
 *  injected; the actual injection happens in PreviewPane.buildShell(). */
function buildFontLinkHref(fonts: string[]): string {
  if (fonts.length === 0) return "";
  const families = fonts
    .map((f) => "family=" + f.trim().replace(/\s+/g, "+"))
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

export default function FontLoaderDialog({
  open,
  onOpenChange,
}: FontLoaderDialogProps) {
  const customFonts = useForge((s) => s.customFonts);
  const setCustomFonts = useForge((s) => s.setCustomFonts);
  const removeCustomFont = useForge((s) => s.removeCustomFont);
  const refreshPreview = useForge((s) => s.refreshPreview);
  const toast = useForge((s) => s.toast);
  const [draft, setDraft] = useState("");

  // The combined set of fonts the user will see in the preview pane after
  // applying the draft: currently-loaded + freshly typed (parsed).
  const pendingFonts = useMemo(() => {
    const fromDraft = draft
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
    const merged = [...customFonts];
    const seen = new Set(merged.map((f) => f.toLowerCase()));
    for (const f of fromDraft) {
      const k = f.toLowerCase();
      if (!seen.has(k)) {
        seen.add(k);
        merged.push(f);
      }
    }
    return merged;
  }, [customFonts, draft]);

  const handleApply = () => {
    const fromDraft = draft
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
    if (fromDraft.length === 0) {
      // No new fonts to add — just close.
      onOpenChange(false);
      return;
    }
    // Merge into the store (dedupes case-insensitively inside setCustomFonts).
    const merged = [...customFonts];
    const seen = new Set(merged.map((f) => f.toLowerCase()));
    for (const f of fromDraft) {
      const k = f.toLowerCase();
      if (!seen.has(k)) {
        seen.add(k);
        merged.push(f);
      }
    }
    setCustomFonts(merged);
    // Force a preview rebuild so the new <link> tag is injected.
    refreshPreview();
    toast(
      `Added ${fromDraft.length} font${fromDraft.length === 1 ? "" : "s"} to the preview.`,
      "ok",
    );
    setDraft("");
    onOpenChange(false);
  };

  const handleRemove = (font: string) => {
    removeCustomFont(font);
    refreshPreview();
    toast(`Removed ${font}.`, "note");
  };

  const previewHref = buildFontLinkHref(pendingFonts);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl"
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
            <Type size={16} /> Custom Font Loader
          </DialogTitle>
        </DialogHeader>

        <div className="forge-font-loader">
          <p className="forge-font-hint">
            Add Google Fonts by name (comma-separated). They are injected into
            the live preview so you can style your bio with them. The list
            persists across sessions.
          </p>

          <div className="forge-font-input-row">
            <input
              type="text"
              className="forge-font-input"
              placeholder="Cinzel, MedievalSharp, UnifrakturMaguntia"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleApply();
                }
              }}
              aria-label="Google Font names (comma-separated)"
            />
            <Button onClick={handleApply} type="button">
              Apply
            </Button>
          </div>

          <div>
            <div
              style={{
                fontSize: 10,
                color: "var(--forge-dim)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Loaded fonts
            </div>
            <div className="forge-font-badges">
              {customFonts.length === 0 && draft.trim() === "" ? (
                <span className="forge-font-badges-empty">
                  No custom fonts loaded yet.
                </span>
              ) : (
                customFonts.map((f) => (
                  <span key={f} className="forge-font-badge">
                    {f}
                    <button
                      type="button"
                      className="forge-font-badge-x"
                      onClick={() => handleRemove(f)}
                      aria-label={`Remove ${f}`}
                      title={`Remove ${f}`}
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 10,
                color: "var(--forge-dim)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Preview
            </div>
            {previewHref && (
              <link rel="stylesheet" href={previewHref} />
            )}
            <div className="forge-font-preview-list">
              {pendingFonts.length === 0 ? (
                <div
                  style={{
                    padding: 12,
                    textAlign: "center",
                    color: "var(--forge-dim)",
                    fontSize: 12,
                  }}
                >
                  Add a font above to see a preview.
                </div>
              ) : (
                pendingFonts.map((f) => (
                  <div
                    key={f}
                    className="forge-font-preview-card"
                    style={{ fontFamily: `"${f}", serif` }}
                  >
                    <div className="forge-font-preview-name" style={{ fontFamily: "Consolas, monospace" }}>
                      {f}
                    </div>
                    <div className="forge-font-preview-sample">
                      The quick brown fox — 1234567890
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div
            className="forge-font-hint"
            style={{
              fontFamily: "Consolas, monospace",
              fontSize: 10,
              wordBreak: "break-all",
              opacity: 0.7,
            }}
          >
            {previewHref || "(no fonts — preview will use the default shell fonts)"}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            type="button"
            variant="outline"
            style={{
              background: "transparent",
              borderColor: "var(--forge-edge)",
              color: "var(--forge-dim)",
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
