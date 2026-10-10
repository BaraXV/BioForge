"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";
import { useForge } from "@/store/forge/useForge";
import { PALETTES, type BioGenerateRequest } from "@/lib/forge/bioGenerator";

interface GenerateDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const TONES: { value: BioGenerateRequest["tone"]; label: string; emoji: string }[] = [
  { value: "wholesome", label: "Wholesome", emoji: "🌸" },
  { value: "dark", label: "Dark", emoji: "🖤" },
  { value: "comedic", label: "Comedic", emoji: "😄" },
  { value: "mysterious", label: "Mysterious", emoji: "🔮" },
  { value: "romantic", label: "Romantic", emoji: "💕" },
  { value: "adventurous", label: "Adventurous", emoji: "⚔️" },
];

const SECTION_LABELS: { key: keyof BioGenerateRequest["sections"]; label: string }[] = [
  { key: "hook", label: "Hero Hook" },
  { key: "intro", label: "Intro / Hook Text" },
  { key: "about", label: "About / Premise" },
  { key: "howItWorks", label: "How It Works" },
  { key: "characters", label: "Characters" },
  { key: "gallery", label: "Gallery" },
  { key: "howToPlay", label: "How to Play" },
  { key: "scenarios", label: "Scenarios" },
  { key: "cta", label: "CTA / Credits" },
];

export default function GenerateDialog({ open, onOpenChange }: GenerateDialogProps) {
  const setHtml = useForge((s) => s.setHtml);
  const toast = useForge((s) => s.toast);
  const clearHistory = useForge((s) => s.clearHistory);

  const [theme, setTheme] = useState("");
  const [setting, setSetting] = useState("");
  const [tone, setTone] = useState<BioGenerateRequest["tone"]>("wholesome");
  const [characterCount, setCharacterCount] = useState(2);
  const [palette, setPalette] = useState<string>("teal");
  const [sections, setSections] = useState<Record<string, boolean>>({
    hook: true, intro: true, about: true, howItWorks: true,
    characters: true, gallery: true, howToPlay: true, scenarios: true, cta: true,
  });
  const [extraInstructions, setExtraInstructions] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!theme.trim()) {
      toast("Describe a theme first — e.g., 'cozy seaside cafe' or 'cyberpunk bar'.", "error");
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/forge/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          theme: theme.trim(),
          setting: setting.trim() || undefined,
          tone,
          characterCount,
          palette,
          sections,
          extraInstructions: extraInstructions.trim() || undefined,
        } satisfies BioGenerateRequest),
      });
      const data = await res.json();
      if (data.ok) {
        clearHistory();
        setHtml(data.html);
        toast(`Generated ${data.chars.toLocaleString()} chars of bio HTML.`, "ok");
        onOpenChange(false);
      } else {
        toast(
          "Generation failed: " + (data.error ?? "unknown error"),
          "error",
          data.raw,
          true,
        );
      }
    } catch (e) {
      toast(
        "Could not reach the generator: " + (e instanceof Error ? e.message : String(e)),
        "error",
      );
    } finally {
      setGenerating(false);
    }
  };

  const toggleSection = (key: string) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl forge-dialog-content"
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
            <Sparkles size={16} /> Generate Bio
          </DialogTitle>
        </DialogHeader>

        <div style={{ maxHeight: "60vh", overflowY: "auto", padding: "0 4px" }}>
          {/* Theme */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 9,
                color: "var(--forge-dim)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Theme / Concept *
            </label>
            <Textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g., A cozy seaside cafe where retired pirates work as baristas. Or: A neon cyberpunk bar that caters to synthetic humans."
              className="min-h-[60px] forge-gen-input"
              style={{
                background: "var(--forge-panel2)",
                color: "var(--forge-text)",
                border: "1px solid var(--forge-edge)",
                fontSize: 12,
              }}
            />
          </div>

          {/* Setting (optional) */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 9,
                color: "var(--forge-dim)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Setting / Genre (optional)
            </label>
            <input
              className="forge-input"
              type="text"
              value={setting}
              onChange={(e) => setSetting(e.target.value)}
              placeholder="e.g., modern fantasy, sci-fi, historical, slice-of-life"
              style={{ width: "100%" }}
            />
          </div>

          {/* Tone */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 9,
                color: "var(--forge-dim)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Tone
            </label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {TONES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  className={`forge-btn ghost ${tone === t.value ? "on" : ""}`}
                  onClick={() => setTone(t.value)}
                  style={{ fontSize: 11 }}
                >
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Character count */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 9,
                color: "var(--forge-dim)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Number of Characters: {characterCount}
            </label>
            <input
              type="range"
              min={1}
              max={4}
              value={characterCount}
              onChange={(e) => setCharacterCount(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--forge-accent)" }}
            />
          </div>

          {/* Palette */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 9,
                color: "var(--forge-dim)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Color Palette
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 6 }}>
              {Object.entries(PALETTES).map(([key, p]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPalette(key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 8px",
                    borderRadius: 6,
                    border: palette === key
                      ? "1px solid var(--forge-accent)"
                      : "1px solid var(--forge-edge)",
                    background: palette === key
                      ? "rgba(120,90,180,0.15)"
                      : "var(--forge-panel2)",
                    color: "var(--forge-text)",
                    cursor: "pointer",
                    fontSize: 11,
                    fontFamily: "inherit",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${p.acc}, ${p.bg})`,
                      border: "1px solid var(--forge-edge)",
                      flexShrink: 0,
                    }}
                  />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 9,
                color: "var(--forge-dim)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Sections to Include
            </label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {SECTION_LABELS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  className={`forge-btn ghost ${sections[s.key] ? "on" : ""}`}
                  onClick={() => toggleSection(s.key)}
                  style={{ fontSize: 10, padding: "4px 8px" }}
                >
                  {sections[s.key] ? "✓ " : ""}
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Extra instructions */}
          <div style={{ marginBottom: 8 }}>
            <label
              style={{
                display: "block",
                fontSize: 9,
                color: "var(--forge-dim)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Additional Instructions (optional)
            </label>
            <Textarea
              value={extraInstructions}
              onChange={(e) => setExtraInstructions(e.target.value)}
              placeholder="e.g., Include a magic system. Set in winter. One character should be antagonistic. Add a mystery element."
              className="min-h-[50px]"
              style={{
                background: "var(--forge-panel2)",
                color: "var(--forge-text)",
                border: "1px solid var(--forge-edge)",
                fontSize: 12,
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            type="button"
            disabled={generating}
          >
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={generating} type="button">
            {generating ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles size={14} /> Generate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
