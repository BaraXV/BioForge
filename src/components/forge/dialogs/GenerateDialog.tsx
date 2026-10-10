"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Plus, X, Wand2 } from "lucide-react";
import { useForge } from "@/store/forge/useForge";
import {
  PALETTES,
  SECTION_LABELS,
  type BioGenerateRequest,
  type CharacterSpec,
  type GenerationMode,
  type StyleIntensity,
  type SectionName,
} from "@/lib/forge/bioGenerator";

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

const STYLE_LABELS: Record<StyleIntensity, string> = {
  1: "Minimal",
  2: "Light",
  3: "Moderate",
  4: "Rich",
  5: "Maximal",
};

const MODES: { value: GenerationMode; label: string; desc: string }[] = [
  { value: "generate", label: "Generate", desc: "Create from scratch" },
  { value: "improve", label: "Improve", desc: "Rewrite existing bio in a new style" },
  { value: "regenerate-section", label: "Regen Section", desc: "Rewrite one section of current bio" },
];

const SECTION_OPTIONS: SectionName[] = ["hook", "intro", "about", "howItWorks", "characters", "gallery", "howToPlay", "scenarios", "cta"];

export default function GenerateDialog({ open, onOpenChange }: GenerateDialogProps) {
  const html = useForge((s) => s.html);
  const setHtml = useForge((s) => s.setHtml);
  const toast = useForge((s) => s.toast);
  const clearHistory = useForge((s) => s.clearHistory);

  const [mode, setMode] = useState<GenerationMode>("generate");
  const [theme, setTheme] = useState("");
  const [setting, setSetting] = useState("");
  const [tone, setTone] = useState<BioGenerateRequest["tone"]>("wholesome");
  const [characterCount, setCharacterCount] = useState(2);
  const [useCustomChars, setUseCustomChars] = useState(false);
  const [characters, setCharacters] = useState<CharacterSpec[]>([
    { name: "", species: "", age: "", personality: "", relationship: "", affection: 5 },
    { name: "", species: "", age: "", personality: "", relationship: "", affection: 2 },
  ]);
  const [palette, setPalette] = useState<string>("teal");
  const [sections, setSections] = useState<Record<SectionName, boolean>>({
    hook: true, intro: true, about: true, howItWorks: true,
    characters: true, gallery: true, howToPlay: true, scenarios: true, cta: true,
  });
  const [styleIntensity, setStyleIntensity] = useState<StyleIntensity>(3);
  const [extraInstructions, setExtraInstructions] = useState("");
  const [highQuality, setHighQuality] = useState(false);
  const [creativity, setCreativity] = useState<1 | 2 | 3>(2);
  const [regenSection, setRegenSection] = useState<SectionName>("intro");
  const [generating, setGenerating] = useState(false);

  const canGenerate = useMemo(() => {
    if (mode === "generate") return theme.trim().length > 0;
    if (mode === "improve") return html.trim().length > 0;
    if (mode === "regenerate-section") return html.trim().length > 0;
    return false;
  }, [mode, theme, html]);

  const handleGenerate = async () => {
    if (!canGenerate) {
      if (mode === "generate") {
        toast("Describe a theme first.", "error");
      } else {
        toast("The editor is empty — paste a bio first.", "error");
      }
      return;
    }
    setGenerating(true);
    try {
      const reqBody: BioGenerateRequest = {
        mode,
        theme: theme.trim(),
        tone,
        characterCount,
        characters: useCustomChars ? characters.filter((c) => c.name.trim()) : undefined,
        palette,
        sections,
        styleIntensity,
        extraInstructions: extraInstructions.trim() || undefined,
        setting: setting.trim() || undefined,
        highQuality: mode === "generate" ? highQuality : false,
        creativity,
      };
      if (mode === "improve") reqBody.existingBio = html;
      if (mode === "regenerate-section") {
        reqBody.currentBio = html;
        reqBody.regenerateSectionName = regenSection;
      }

      const res = await fetch("/api/forge/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(reqBody),
      });
      const data = await res.json();
      if (data.ok) {
        clearHistory();
        setHtml(data.html);
        const modeLabel = mode === "generate" ? "Generated" : mode === "improve" ? "Improved" : "Regenerated";
        const cachedLabel = data.cached ? " (cached)" : "";
        toast(
          `${modeLabel} ${data.chars.toLocaleString()} chars${data.provider ? ` (${data.provider})` : ""}${cachedLabel}.`,
          "ok",
        );
        // Show length-preservation warning if the API detected content trimming
        if (data.warning) {
          setTimeout(() => {
            toast("⚠️ Length warning — click for details.", "note", data.warning, true);
          }, 600);
        }
        onOpenChange(false);
      } else {
        const isConfigError = data.error?.includes("OPENAI_API_KEY") ||
          data.error?.includes("Configuration file") || data.error?.includes("No LLM");
        toast(
          isConfigError ? "API key not set up — click for setup instructions." : "Generation failed: " + (data.error ?? "unknown error"),
          "error",
          data.error,
          true,
        );
      }
    } catch (e) {
      toast("Could not reach the generator: " + (e instanceof Error ? e.message : String(e)), "error");
    } finally {
      setGenerating(false);
    }
  };

  const toggleSection = (key: SectionName) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateCharacter = (i: number, field: keyof CharacterSpec, value: string | number) => {
    setCharacters((prev) => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c));
  };

  const addCharacter = () => {
    if (characters.length >= 4) return;
    setCharacters([...characters, { name: "", species: "", age: "", personality: "", relationship: "", affection: 3 }]);
  };

  const removeCharacter = (i: number) => {
    setCharacters(characters.filter((_, idx) => idx !== i));
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
          <DialogTitle className="flex items-center gap-2" style={{ color: "var(--forge-accent2)" }}>
            <Sparkles size={16} /> {mode === "generate" ? "Generate Bio" : mode === "improve" ? "Improve Bio" : "Regenerate Section"}
          </DialogTitle>
        </DialogHeader>

        <div style={{ maxHeight: "60vh", overflowY: "auto", padding: "0 4px" }}>
          {/* Mode selector */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 9, color: "var(--forge-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
              Mode
            </label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {MODES.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  className={`forge-btn ghost ${mode === m.value ? "on" : ""}`}
                  onClick={() => setMode(m.value)}
                  style={{ fontSize: 11, flexDirection: "column", alignItems: "flex-start", gap: 2, padding: "6px 10px" }}
                >
                  <span style={{ fontWeight: 700 }}>{m.label}</span>
                  <span style={{ fontSize: 9, opacity: 0.7 }}>{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mode-specific info banner */}
          {mode === "improve" && (
            <div style={{ marginBottom: 16, padding: "8px 10px", background: "rgba(235,130,90,0.1)", border: "1px solid var(--forge-ember)", borderRadius: 6, fontSize: 11, color: "var(--forge-text)" }}>
              ⚡ <b>Improve mode:</b> The bio currently in your editor will be rewritten with the new palette, tone, and style. Characters, setting, and scenarios are preserved — only the prose and styling change.
            </div>
          )}
          {mode === "regenerate-section" && (
            <div style={{ marginBottom: 16, padding: "8px 10px", background: "rgba(235,130,90,0.1)", border: "1px solid var(--forge-ember)", borderRadius: 6, fontSize: 11, color: "var(--forge-text)" }}>
              ⚡ <b>Regenerate section:</b> Pick a section below — only that section will be rewritten. Everything else stays identical.
            </div>
          )}

          {/* Regenerate-section: section picker */}
          {mode === "regenerate-section" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 9, color: "var(--forge-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
                Section to Regenerate
              </label>
              <select
                className="forge-select"
                value={regenSection}
                onChange={(e) => setRegenSection(e.target.value as SectionName)}
                style={{ width: "100%" }}
              >
                {SECTION_OPTIONS.map((s) => (
                  <option key={s} value={s}>{SECTION_LABELS[s]}</option>
                ))}
              </select>
            </div>
          )}

          {/* Theme (generate mode only) */}
          {mode === "generate" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 9, color: "var(--forge-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
                Theme / Concept *
              </label>
              <Textarea
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="e.g., A cozy seaside cafe where retired pirates work as baristas. Or: A neon cyberpunk bar that caters to synthetic humans."
                className="min-h-[60px]"
                style={{ background: "var(--forge-panel2)", color: "var(--forge-text)", border: "1px solid var(--forge-edge)", fontSize: 12 }}
              />
            </div>
          )}

          {/* Setting (generate mode only) */}
          {mode === "generate" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 9, color: "var(--forge-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
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
          )}

          {/* Tone (all modes) */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 9, color: "var(--forge-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
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

          {/* Style intensity (2.4) */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 9, color: "var(--forge-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
              Style Intensity: {STYLE_LABELS[styleIntensity]}
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={styleIntensity}
              onChange={(e) => setStyleIntensity(Number(e.target.value) as StyleIntensity)}
              style={{ width: "100%", accentColor: "var(--forge-accent)" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--forge-dim)", marginTop: 2 }}>
              <span>Minimal</span><span>Light</span><span>Moderate</span><span>Rich</span><span>Maximal</span>
            </div>
          </div>

          {/* Creativity (variety) */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 9, color: "var(--forge-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
              Creativity: {creativity === 1 ? "Template (consistent)" : creativity === 2 ? "Varied" : "Inventive (unique each time)"}
            </label>
            <div style={{ display: "flex", gap: 6 }}>
              {([
                { v: 1, label: "Template", desc: "Same structure every time" },
                { v: 2, label: "Varied", desc: "Same sections, different styling" },
                { v: 3, label: "Inventive", desc: "Invents own structure entirely" },
              ] as const).map((c) => (
                <button
                  key={c.v}
                  type="button"
                  className={`forge-btn ghost ${creativity === c.v ? "on" : ""}`}
                  onClick={() => setCreativity(c.v)}
                  style={{ fontSize: 10, flexDirection: "column", alignItems: "flex-start", gap: 2, padding: "6px 10px", flex: 1 }}
                >
                  <span style={{ fontWeight: 700 }}>{c.label}</span>
                  <span style={{ fontSize: 9, opacity: 0.7 }}>{c.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Characters (generate mode only) */}
          {mode === "generate" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 9, color: "var(--forge-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
                Characters
              </label>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                <button
                  type="button"
                  className={`forge-btn ghost ${!useCustomChars ? "on" : ""}`}
                  onClick={() => setUseCustomChars(false)}
                  style={{ fontSize: 10 }}
                >
                  Auto-invent
                </button>
                <button
                  type="button"
                  className={`forge-btn ghost ${useCustomChars ? "on" : ""}`}
                  onClick={() => setUseCustomChars(true)}
                  style={{ fontSize: 10 }}
                >
                  Specify manually
                </button>
              </div>
              {!useCustomChars ? (
                <div>
                  <label style={{ fontSize: 10, color: "var(--forge-dim)", marginBottom: 4, display: "block" }}>
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
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {characters.map((c, i) => (
                    <div key={i} style={{ border: "1px solid var(--forge-edge)", borderRadius: 6, padding: 8, background: "var(--forge-panel2)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 10, color: "var(--forge-accent2)", fontWeight: 700 }}>Character {i + 1}</span>
                        {characters.length > 1 && (
                          <button
                            type="button"
                            className="forge-btn ghost"
                            onClick={() => removeCharacter(i)}
                            style={{ padding: "2px 6px", fontSize: 10 }}
                          >
                            <X size={10} />
                          </button>
                        )}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                        <input className="forge-input" type="text" placeholder="Name" value={c.name} onChange={(e) => updateCharacter(i, "name", e.target.value)} style={{ fontSize: 11 }} />
                        <input className="forge-input" type="text" placeholder="Species/Type" value={c.species} onChange={(e) => updateCharacter(i, "species", e.target.value)} style={{ fontSize: 11 }} />
                        <input className="forge-input" type="text" placeholder="Age" value={c.age} onChange={(e) => updateCharacter(i, "age", e.target.value)} style={{ fontSize: 11 }} />
                        <input className="forge-input" type="number" min={0} max={100} placeholder="Affection % (0-100)" value={c.affection} onChange={(e) => updateCharacter(i, "affection", Number(e.target.value))} style={{ fontSize: 11 }} />
                      </div>
                      <input className="forge-input" type="text" placeholder="Personality (1-2 sentences)" value={c.personality} onChange={(e) => updateCharacter(i, "personality", e.target.value)} style={{ fontSize: 11, width: "100%", marginTop: 4 }} />
                      <input className="forge-input" type="text" placeholder="Relationship to {{user}}" value={c.relationship} onChange={(e) => updateCharacter(i, "relationship", e.target.value)} style={{ fontSize: 11, width: "100%", marginTop: 4 }} />
                    </div>
                  ))}
                  {characters.length < 4 && (
                    <button type="button" className="forge-btn ghost" onClick={addCharacter} style={{ fontSize: 10, alignSelf: "flex-start" }}>
                      <Plus size={11} /> Add Character
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Palette (all modes) */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 9, color: "var(--forge-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
              Color Palette
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 6 }}>
              {Object.entries(PALETTES).map(([key, p]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPalette(key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", borderRadius: 6,
                    border: palette === key ? "1px solid var(--forge-accent)" : "1px solid var(--forge-edge)",
                    background: palette === key ? "rgba(120,90,180,0.15)" : "var(--forge-panel2)",
                    color: "var(--forge-text)", cursor: "pointer", fontSize: 11, fontFamily: "inherit",
                  }}
                >
                  <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 3, background: `linear-gradient(135deg, ${p.acc}, ${p.bg})`, border: "1px solid var(--forge-edge)", flexShrink: 0 }} />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sections (generate + improve modes) */}
          {mode !== "regenerate-section" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 9, color: "var(--forge-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
                Sections to Include
              </label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {SECTION_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`forge-btn ghost ${sections[s] ? "on" : ""}`}
                    onClick={() => toggleSection(s)}
                    style={{ fontSize: 10, padding: "4px 8px" }}
                  >
                    {sections[s] ? "✓ " : ""}
                    {SECTION_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* High quality toggle (generate mode only) */}
          {mode === "generate" && (
            <div style={{ marginBottom: 16, padding: "8px 10px", background: "var(--forge-panel2)", border: "1px solid var(--forge-edge)", borderRadius: 6 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 11 }}>
                <input
                  type="checkbox"
                  checked={highQuality}
                  onChange={(e) => setHighQuality(e.target.checked)}
                  style={{ accentColor: "var(--forge-accent)" }}
                />
                <span>
                  <b>High-quality mode</b> (section-by-section generation)
                  <span style={{ display: "block", color: "var(--forge-dim)", fontSize: 10 }}>
                    Slower (4-5 API calls) but richer, more detailed output. Recommended for final drafts.
                  </span>
                </span>
              </label>
            </div>
          )}

          {/* Extra instructions */}
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 9, color: "var(--forge-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
              {mode === "regenerate-section" ? "Instructions for This Section (optional)" : "Additional Instructions (optional)"}
            </label>
            <Textarea
              value={extraInstructions}
              onChange={(e) => setExtraInstructions(e.target.value)}
              placeholder={mode === "regenerate-section" ? "e.g., Make it longer, add more humor, focus on the character's backstory" : "e.g., Include a magic system. Set in winter. One character should be antagonistic."}
              className="min-h-[50px]"
              style={{ background: "var(--forge-panel2)", color: "var(--forge-text)", border: "1px solid var(--forge-edge)", fontSize: 12 }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} type="button" disabled={generating}>
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={generating || !canGenerate} type="button">
            {generating ? (
              <>
                <Loader2 size={14} className="animate-spin" /> {highQuality && mode === "generate" ? "Generating (section-by-section)…" : "Generating…"}
              </>
            ) : (
              <>
                {mode === "generate" ? <Sparkles size={14} /> : <Wand2 size={14} />}
                {mode === "generate" ? "Generate" : mode === "improve" ? "Improve" : "Regenerate"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
