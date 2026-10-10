/**
 * Bio generation prompt builder.
 *
 * Constructs the system + user prompts for the LLM that generate JanitorAI
 * character bios following the "house format" structure.
 *
 * Supports:
 * - Generate from scratch (theme → bio)
 * - Improve existing bio (4.1): take an existing bio, rewrite in a new style
 * - Section regeneration (2.3): rewrite just one section
 * - Section-by-section generation (1.4): higher quality via focused calls
 * - Character editor (2.1): user specifies exact characters
 * - Style intensity (2.4): minimal → maximal CSS styling
 * - Caching (3.4): hash request for cache key (in API route)
 * - Stricter prompt (1.2): anti-laziness rules + quality bars
 */

// ============================================================
// Types
// ============================================================

export interface CharacterSpec {
  name: string;
  species: string;
  age: string;
  personality: string;
  relationship: string;
  affection: number; // 0-100
}

export type GenerationMode = "generate" | "improve" | "regenerate-section";
export type StyleIntensity = 1 | 2 | 3 | 4 | 5; // minimal → maximal
export type SectionName =
  | "hook" | "intro" | "about" | "howItWorks"
  | "characters" | "gallery" | "howToPlay" | "scenarios" | "cta";

export interface BioGenerateRequest {
  /** Generation mode: from scratch, improve existing, or regenerate one section. */
  mode: GenerationMode;
  /** Free-form theme description, e.g., "cozy seaside cafe", "neon cyberpunk bar". */
  theme: string;
  /** Tone / mood of the bio. */
  tone: "wholesome" | "dark" | "comedic" | "mysterious" | "romantic" | "adventurous";
  /** Number of characters to include (1-4). Ignored if `characters` is provided. */
  characterCount: number;
  /** Explicit character specs (overrides characterCount if provided). */
  characters?: CharacterSpec[];
  /** Color palette preset name. */
  palette: "teal" | "ember" | "gold" | "purple" | "forest" | "rose" | "ocean" | "mono";
  /** Which sections to include. */
  sections: Record<SectionName, boolean>;
  /** Style intensity 1-5 (minimal → maximal). */
  styleIntensity: StyleIntensity;
  /** Optional extra instructions. */
  extraInstructions?: string;
  /** Optional setting/genre keywords. */
  setting?: string;
  /** For "improve" mode: the existing bio HTML to rewrite. */
  existingBio?: string;
  /** For "regenerate-section" mode: which section to rewrite. */
  regenerateSectionName?: SectionName;
  /** For "regenerate-section" mode: the current full bio HTML. */
  currentBio?: string;
  /** Use section-by-section generation (higher quality, slower). */
  highQuality?: boolean;
}

// ============================================================
// Palettes
// ============================================================

export interface PaletteDef {
  name: string;
  acc: string;
  acc2: string;
  bg: string;
  card: string;
  line: string;
  txt: string;
  mut: string;
}

export const PALETTES: Record<string, PaletteDef> = {
  teal: {
    name: "Teal Reef",
    acc: "#2fb8a8", acc2: "#7fe3d3", bg: "#05090a", card: "#0a1416",
    line: "rgba(47,184,168,.35)", txt: "#e6f1ef", mut: "#86a39f",
  },
  ember: {
    name: "Ember Dossier",
    acc: "#eb825a", acc2: "#f5b89a", bg: "#120c0a", card: "#1c1310",
    line: "rgba(235,130,90,.35)", txt: "#ece2dc", mut: "#b89e94",
  },
  gold: {
    name: "Gold Obsidian",
    acc: "#c9a84c", acc2: "#e8d5a0", bg: "#0b0a08", card: "#15130d",
    line: "rgba(201,168,76,.35)", txt: "#f0e6c8", mut: "#a89570",
  },
  purple: {
    name: "Purple Noir",
    acc: "#9d6cf0", acc2: "#c4a6ff", bg: "#0a0814", card: "#13101f",
    line: "rgba(157,108,240,.35)", txt: "#e8e2f5", mut: "#9088a8",
  },
  forest: {
    name: "Forest Moss",
    acc: "#5ba85b", acc2: "#9ed49e", bg: "#070d08", card: "#0d150e",
    line: "rgba(91,168,91,.35)", txt: "#e5f0e5", mut: "#7a9a7a",
  },
  rose: {
    name: "Rose Noir",
    acc: "#e85a8a", acc2: "#f5a0c0", bg: "#0e0709", card: "#160d10",
    line: "rgba(232,90,138,.35)", txt: "#f5e2ea", mut: "#a88090",
  },
  ocean: {
    name: "Deep Ocean",
    acc: "#4a8de8", acc2: "#8fb8f5", bg: "#050810", card: "#0a1020",
    line: "rgba(74,141,232,.35)", txt: "#e2eaf5", mut: "#7088a8",
  },
  mono: {
    name: "Monochrome",
    acc: "#b0b0b0", acc2: "#d0d0d0", bg: "#080808", card: "#121212",
    line: "rgba(176,176,176,.35)", txt: "#e8e8e8", mut: "#808080",
  },
};

// ============================================================
// Section metadata
// ============================================================

export const SECTION_LABELS: Record<SectionName, string> = {
  hook: "Hook (hero image + tagline)",
  intro: "Intro (conversational callout)",
  about: "About / Premise",
  howItWorks: "How It Works",
  characters: "Characters",
  gallery: "Gallery",
  howToPlay: "How to Play",
  scenarios: "Scenarios",
  cta: "CTA / Credits",
};

// ============================================================
// System prompt (1.2 — stricter, anti-laziness)
// ============================================================

export function buildSystemPrompt(): string {
  return `You are an expert HTML bio designer for JanitorAI character cards. You write richly-structured, visually-styled HTML bios using inline CSS only.

CRITICAL RULES (FOLLOW ALL):
1. Output ONLY the bio HTML — no markdown fences, no explanations, no \`\`\`html wrapper, no preamble, no postscript. Start with <div and end with </div>.
2. Use ONLY inline styles on every element. NEVER use <style>, <script>, class="", id="", position:, z-index, or width:100vw.
3. The bio MUST start with a single root <div> that sets CSS custom properties (--acc, --acc2, --bg, --card, --line, --txt, --mut) and uses them throughout via var(--acc) etc.
4. Use the "house format": root <div> wrapper > inner <div> container > content sections.
5. Make it fully responsive: use display:grid with grid-template-columns:repeat(auto-fit,minmax(11rem,1fr)) for card grids. NEVER use fixed pixel widths on containers.
6. Use <details>/<summary> for collapsible character intros and scenarios. Give each <details> a name attribute.
7. Section dividers EXACT pattern: <div style="margin:1.6rem 0 .8rem;text-align:center;font-size:.7rem;font-weight:800;letter-spacing:.35em;color:var(--acc);">❖ SECTION NAME ❖</div>
8. For images, use placeholder URLs like https://ella.janitorai.com/media-approved/PLACEHOLDER.webp — the user will replace them.
9. Include {{user}} in the premise/scenario text where the user's persona goes.
10. Use decorative unicode (❖ ✦ ◆ ▾ ➤) sparingly for accents.

QUALITY BARS (DO NOT BE LAZY):
- Every section MUST have at least 3 sentences of real, substantive prose. No one-liners.
- The INTRO section must be 150+ words — this is the "yap section." Write it in a lively, characterful, second-person narrator voice. Be specific, be funny, be theatrical. Do NOT write generic boilerplate.
- Each CHARACTER description must include: personality (2+ sentences), appearance note, and their relationship/dynamic with {{user}}. Do not just list traits — write flowing prose.
- ABOUT/PREMISE must explain the setting clearly — what is this place, why are we here, what's the deal.
- SCENARIOS must each have a 3+ sentence setup that establishes a specific moment, not a vague concept.
- Do NOT use placeholder text like "lorem ipsum," "insert description here," or "[TODO]". Write actual content.
- Do NOT repeat the same sentence with minor variations. Each sentence must add new information.
- Do NOT use generic fantasy/sci-fi boilerplate ("a land of wonder," "where magic and technology collide"). Be specific to THIS theme.

STRUCTURE (include requested sections in this order):
- HOOK: Hero area using grid overlay technique (grid-template-columns:1fr with stacked children: bg image, gradient overlay, tagline text at bottom).
- INTRO: Bordered callout (border-left:3px solid var(--acc), background tinted with accent at 0.07 opacity). 150+ words. Conversational, theatrical.
- ABOUT: One or two bordered cards explaining the setting/premise.
- HOW IT WORKS: Responsive grid of 3-4 small info cards.
- CHARACTERS: For each character, a <details> block with: summary row (name + meta), portrait image (flex:0 0 11rem, aspect-ratio:2/3), description paragraph, and an "affection meter" bar (div with colored fill at a LOW percentage, 2-15%). Use different border-left colors per character.
- GALLERY: Horizontal scroll-snap row (display:flex, overflow-x:auto, scroll-snap-type:x mandatory) of 4-6 portrait cards.
- HOW TO PLAY: Responsive grid of 2-3 guidance cards (persona suggestion, tone, pacing).
- SCENARIOS: 2-3 <details> blocks, each with a scenario title and 3+ sentence setup.
- CTA: Centered button-style link + small credits line.

VOICE: Write with personality. The intro should feel like a narrator setting the scene — warm but specific, with humor where appropriate. Make the setting feel lived-in and real. Every character must sound distinct.`;
}

// ============================================================
// Style intensity helper (2.4)
// ============================================================

function styleIntensityDescription(level: StyleIntensity): string {
  switch (level) {
    case 1: return "MINIMAL styling: simple borders (1px solid var(--line)), no shadows, no gradients, no border-radius, plain backgrounds. Clean and sparse.";
    case 2: return "LIGHT styling: subtle borders, small border-radius (.5rem), very subtle shadows, one or two gradient accents max.";
    case 3: return "MODERATE styling (default): rounded corners (.8rem), card backgrounds, subtle shadows, gradient overlays on hero, decorative dividers.";
    case 4: return "RICH styling: layered gradients, prominent shadows, decorative borders (double borders, accent strips), hover-style transitions, ornamental dividers, multiple background layers.";
    case 5: return "MAXIMAL styling: heavy gradients (radial + linear), dramatic shadows, animated-style transitions, ornate decorative elements (◆ ❖ ✦), glowing accents, layered overlays, transform effects, every visual trick in the book. Make it look stunning.";
    default: return "MODERATE styling.";
  }
}

// ============================================================
// Character spec formatter (2.1)
// ============================================================

function formatCharacters(chars: CharacterSpec[] | undefined, count: number): string {
  if (chars && chars.length > 0) {
    const lines = chars.map((c, i) => {
      return `  Character ${i + 1}:
    Name: ${c.name || "(invent one)"}
    Species/Type: ${c.species || "(invent one)"}
    Age: ${c.age || "(invent one)"}
    Personality: ${c.personality || "(invent one)"}
    Relationship to {{user}}: ${c.relationship || "(invent one)"}
    Affection toward {{user}}: ${c.affection}% (use this exact percentage for the affection meter bar)`;
    });
    return `CHARACTERS (use these EXACT specifications — do not change names, species, or relationships):\n${lines.join("\n")}`;
  }
  return `NUMBER OF CHARACTERS: ${count} (invent them yourself — give each a distinct name, species, personality, and relationship to {{user}})`;
}

// ============================================================
// Build user prompt for "generate" mode
// ============================================================

export function buildUserPrompt(req: BioGenerateRequest): string {
  const palette = PALETTES[req.palette] ?? PALETTES.teal;
  const sectionList: string[] = [];
  (Object.keys(req.sections) as SectionName[]).forEach((key) => {
    if (req.sections[key]) sectionList.push(SECTION_LABELS[key]);
  });

  const toneMap: Record<string, string> = {
    wholesome: "warm, cozy, slice-of-life with gentle humor",
    dark: "ominous, tense, with underlying dread",
    comedic: "witty, absurd, played for laughs but with heart",
    mysterious: "enigmatic, withholding, building intrigue",
    romantic: "tender, yearning, emotionally charged",
    adventurous: "bold, energetic, high-stakes and forward-moving",
  };

  const parts: string[] = [];
  parts.push(`Generate a JanitorAI character bio with these specifications:`);
  parts.push(``);
  parts.push(`THEME: ${req.theme}`);
  if (req.setting) parts.push(`SETTING/GENRE: ${req.setting}`);
  parts.push(`TONE: ${toneMap[req.tone] ?? req.tone}`);
  parts.push(``);
  parts.push(formatCharacters(req.characters, req.characterCount));
  parts.push(``);
  parts.push(`COLOR PALETTE (use these exact CSS variable values in the root div):`);
  parts.push(`  --acc: ${palette.acc}`);
  parts.push(`  --acc2: ${palette.acc2}`);
  parts.push(`  --bg: ${palette.bg}`);
  parts.push(`  --card: ${palette.card}`);
  parts.push(`  --line: ${palette.line}`);
  parts.push(`  --txt: ${palette.txt}`);
  parts.push(`  --mut: ${palette.mut}`);
  parts.push(`  font-family: Inter, system-ui, sans-serif`);
  parts.push(``);
  parts.push(`STYLE INTENSITY: ${styleIntensityDescription(req.styleIntensity)}`);
  parts.push(``);
  parts.push(`SECTIONS TO INCLUDE (in this order):`);
  for (const s of sectionList) parts.push(`  - ${s}`);
  parts.push(``);
  if (req.extraInstructions) {
    parts.push(`ADDITIONAL INSTRUCTIONS:`);
    parts.push(req.extraInstructions);
    parts.push(``);
  }
  parts.push(`REMEMBER: Output ONLY the raw HTML. No markdown, no code fences, no explanation. Start with <div and end with </div>. Use inline styles only. Use CSS variables (var(--acc) etc.) for all colors. Meet every quality bar — no lazy one-liners.`);

  return parts.join("\n");
}

// ============================================================
// Build prompt for "improve" mode (4.1)
// ============================================================

export function buildImprovePrompt(req: BioGenerateRequest): string {
  const palette = PALETTES[req.palette] ?? PALETTES.teal;
  const toneMap: Record<string, string> = {
    wholesome: "warm, cozy, slice-of-life with gentle humor",
    dark: "ominous, tense, with underlying dread",
    comedic: "witty, absurd, played for laughs but with heart",
    mysterious: "enigmatic, withholding, building intrigue",
    romantic: "tender, yearning, emotionally charged",
    adventurous: "bold, energetic, high-stakes and forward-moving",
  };

  const parts: string[] = [];
  parts.push(`IMPROVE / REWRITE an existing JanitorAI bio.`);
  parts.push(``);
  parts.push(`Here is the existing bio HTML. Analyze it to extract: the characters (names, species, personalities, relationships), the setting/premise, the scenarios, and the overall structure. Then REWRITE the entire bio from scratch in a NEW style while preserving all the core content (same characters, same setting, same scenarios).`);
  parts.push(``);
  parts.push(`EXISTING BIO HTML:`);
  parts.push(`<existing-bio>`);
  parts.push(req.existingBio || "");
  parts.push(`</existing-bio>`);
  parts.push(``);
  parts.push(`REWRITE SPECIFICATIONS:`);
  parts.push(`TONE: ${toneMap[req.tone] ?? req.tone}`);
  if (req.theme) parts.push(`THEME ADJUSTMENT: ${req.theme} (adapt the existing setting toward this theme if specified)`);
  parts.push(``);
  parts.push(`NEW COLOR PALETTE (use these exact CSS variable values in the root div):`);
  parts.push(`  --acc: ${palette.acc}`);
  parts.push(`  --acc2: ${palette.acc2}`);
  parts.push(`  --bg: ${palette.bg}`);
  parts.push(`  --card: ${palette.card}`);
  parts.push(`  --line: ${palette.line}`);
  parts.push(`  --txt: ${palette.txt}`);
  parts.push(`  --mut: ${palette.mut}`);
  parts.push(`  font-family: Inter, system-ui, sans-serif`);
  parts.push(``);
  parts.push(`STYLE INTENSITY: ${styleIntensityDescription(req.styleIntensity)}`);
  parts.push(``);
  parts.push(`SECTIONS TO INCLUDE (keep the same sections as the original, or use these if specified):`);
  (Object.keys(req.sections) as SectionName[]).forEach((key) => {
    if (req.sections[key]) parts.push(`  - ${SECTION_LABELS[key]}`);
  });
  parts.push(``);
  parts.push(`RULES FOR REWRITING:`);
  parts.push(`1. Keep ALL character names, species, and core personalities from the original.`);
  parts.push(`2. Keep the same setting/premise — do not change what the bio is about.`);
  parts.push(`3. Keep the same scenarios (you may rewrite the prose but keep the scenario concepts).`);
  parts.push(`4. REWRITE all prose in the new tone — do not copy the original sentences. Make it fresh.`);
  parts.push(`5. Apply the new color palette and style intensity completely.`);
  parts.push(`6. Improve any weak/thin sections — add detail, personality, and depth.`);
  parts.push(`7. Keep {{user}} references where they were in the original.`);
  parts.push(`8. Preserve any image URLs from the original — do not replace them with placeholders.`);
  parts.push(``);
  if (req.extraInstructions) {
    parts.push(`ADDITIONAL INSTRUCTIONS:`);
    parts.push(req.extraInstructions);
    parts.push(``);
  }
  parts.push(`REMEMBER: Output ONLY the raw HTML. No markdown, no code fences. Start with <div and end with </div>. Same characters + setting, brand new prose + style.`);

  return parts.join("\n");
}

// ============================================================
// Build prompt for "regenerate-section" mode (2.3)
// ============================================================

export function buildRegenerateSectionPrompt(req: BioGenerateRequest): string {
  const sectionName = req.regenerateSectionName ?? "intro";
  const label = SECTION_LABELS[sectionName] || sectionName;

  const parts: string[] = [];
  parts.push(`REGENERATE a single section of an existing JanitorAI bio.`);
  parts.push(``);
  parts.push(`Here is the current full bio HTML:`);
  parts.push(`<current-bio>`);
  parts.push(req.currentBio || "");
  parts.push(`</current-bio>`);
  parts.push(``);
  parts.push(`TASK: Rewrite ONLY the ${label} section. Keep everything else identical. Output the FULL bio HTML with just the ${label} section rewritten.`);
  parts.push(``);
  parts.push(`REWRITE RULES:`);
  parts.push(`1. Output the COMPLETE bio HTML (all sections), with only the ${label} section changed.`);
  parts.push(`2. Keep all other sections byte-for-byte identical (same HTML, same text, same styles).`);
  parts.push(`3. The rewritten ${label} section must use the same CSS variables (var(--acc) etc.) as the rest of the bio.`);
  parts.push(`4. The rewritten ${label} section must match the tone and voice of the rest of the bio.`);
  parts.push(`5. Make the rewritten section BETTER than the original — richer prose, more detail, more personality. Meet the quality bars (3+ sentences, no laziness).`);
  parts.push(`6. Do NOT change character names, the setting, or any image URLs.`);
  parts.push(``);
  if (req.extraInstructions) {
    parts.push(`ADDITIONAL INSTRUCTIONS FOR THIS SECTION:`);
    parts.push(req.extraInstructions);
    parts.push(``);
  }
  parts.push(`REMEMBER: Output ONLY the complete raw HTML with the ${label} section rewritten. No markdown, no code fences. Start with <div and end with </div>.`);

  return parts.join("\n");
}

// ============================================================
// Section-by-section generation (1.4)
// ============================================================

export interface SectionGenSpec {
  name: SectionName;
  label: string;
  instruction: string;
}

export function getSectionSpecs(req: BioGenerateRequest): SectionGenSpec[] {
  const specs: SectionGenSpec[] = [];
  const s = req.sections;

  if (s.hook) specs.push({
    name: "hook", label: "Hook",
    instruction: "Generate ONLY the HOOK section: a hero area using grid overlay technique (grid-template-columns:1fr with stacked children: bg image div, gradient overlay div, tagline text div at bottom). Include a placeholder background image URL. The tagline should be a short evocative label for the setting (e.g., 'OCEANUS UNIVERSITY · CO-LIVING PROGRAM · SUITE 404').",
  });
  if (s.intro) specs.push({
    name: "intro", label: "Intro",
    instruction: "Generate ONLY the INTRO section: a bordered callout block (border-left:3px solid var(--acc), background:rgba(accent,0.07), border-radius:0 .85rem .85rem 0, padding:1rem, font-size:.88rem, line-height:1.8). This is the 'yap section' — write 150+ words in a lively, theatrical, second-person narrator voice. Be specific, be funny, set the scene. Include a bold header like '[ ATTENTION, RESIDENT ]' or similar.",
  });
  if (s.about) specs.push({
    name: "about", label: "About",
    instruction: "Generate ONLY the ABOUT section: one or two bordered cards (border:1px solid var(--line), border-radius:.8rem, background:var(--card), padding:.9rem) explaining the setting/premise. Each card should have a bold colored header and 3+ sentences of explanatory prose.",
  });
  if (s.howItWorks) specs.push({
    name: "howItWorks", label: "How It Works",
    instruction: "Generate ONLY the HOW IT WORKS section: a responsive grid (grid-template-columns:repeat(auto-fit,minmax(11rem,1fr)), gap:.6rem) of 3-4 small info cards. Each card: border, border-radius:.8rem, background:var(--card), padding:.8rem, bold colored header, 2-3 sentence explanation.",
  });
  if (s.characters) specs.push({
    name: "characters", label: "Characters",
    instruction: `Generate ONLY the CHARACTERS section: ${req.characters?.length || req.characterCount} <details> blocks, one per character. Each <details>: border, border-left:3px solid (different color per character), border-radius:.85rem, background:var(--card), padding:.8rem. The <summary>: flex row with character name (bold, colored) + meta line (age · species · role) + a ▾ indicator. Inside: flex row with portrait image (flex:0 0 11rem, aspect-ratio:2/3, background-image placeholder) + description (3+ sentences covering personality, appearance, relationship to {{user}}) + an affection meter bar (a 4px tall track with a colored fill at the character's affection %).`,
  });
  if (s.gallery) specs.push({
    name: "gallery", label: "Gallery",
    instruction: "Generate ONLY the GALLERY section: a horizontal scroll-snap row (display:flex, gap:.6rem, overflow-x:auto, scroll-snap-type:x mandatory, padding-bottom:.4rem) of 4-6 portrait cards. Each card: flex:0 0 10rem, aspect-ratio:2/3, background-image placeholder, border-radius:.7rem, border. Below each image: a small centered label with the character name.",
  });
  if (s.howToPlay) specs.push({
    name: "howToPlay", label: "How to Play",
    instruction: "Generate ONLY the HOW TO PLAY section: a responsive grid of 2-3 guidance cards (persona suggestion, tone/pacing, content warnings). Same card style as HOW IT WORKS.",
  });
  if (s.scenarios) specs.push({
    name: "scenarios", label: "Scenarios",
    instruction: "Generate ONLY the SCENARIOS section: 2-3 <details> blocks, each with a scenario title (◆ icon + title) and a 3+ sentence setup paragraph that establishes a specific moment. Same card style as CHARACTERS but without portraits.",
  });
  if (s.cta) specs.push({
    name: "cta", label: "CTA",
    instruction: "Generate ONLY the CTA section: a centered area with a button-style link (display:inline-block, padding:.7rem 1.4rem, border:1px solid var(--acc), border-radius:999px, background:rgba(accent,0.12), colored text, font-weight:800, letter-spacing:.15em, text-decoration:none) + a small credits line below (font-size:.65rem, letter-spacing:.2em, color:var(--mut)).",
  });

  return specs;
}

export function buildSectionPrompt(req: BioGenerateRequest, spec: SectionGenSpec): string {
  const palette = PALETTES[req.palette] ?? PALETTES.teal;
  const toneMap: Record<string, string> = {
    wholesome: "warm, cozy, slice-of-life with gentle humor",
    dark: "ominous, tense, with underlying dread",
    comedic: "witty, absurd, played for laughs but with heart",
    mysterious: "enigmatic, withholding, building intrigue",
    romantic: "tender, yearning, emotionally charged",
    adventurous: "bold, energetic, high-stakes and forward-moving",
  };

  const parts: string[] = [];
  parts.push(`You are generating ONE section of a JanitorAI bio. Output ONLY the HTML for this section — no root wrapper, no other sections.`);
  parts.push(``);
  parts.push(`THEME: ${req.theme}`);
  if (req.setting) parts.push(`SETTING/GENRE: ${req.setting}`);
  parts.push(`TONE: ${toneMap[req.tone] ?? req.tone}`);
  parts.push(``);
  if (req.characters && req.characters.length > 0) {
    parts.push(formatCharacters(req.characters, req.characterCount));
    parts.push(``);
  } else {
    parts.push(`NUMBER OF CHARACTERS: ${req.characterCount} (invent them)`);
    parts.push(``);
  }
  parts.push(`COLOR PALETTE (use var(--acc) etc. — do NOT hardcode colors):`);
  parts.push(`  --acc: ${palette.acc}, --acc2: ${palette.acc2}, --bg: ${palette.bg}, --card: ${palette.card}, --line: ${palette.line}, --txt: ${palette.txt}, --mut: ${palette.mut}`);
  parts.push(``);
  parts.push(`STYLE INTENSITY: ${styleIntensityDescription(req.styleIntensity)}`);
  parts.push(``);
  parts.push(`SECTION TO GENERATE: ${spec.label}`);
  parts.push(spec.instruction);
  parts.push(``);
  parts.push(`RULES: Output ONLY the HTML for this section. No <div> root wrapper (the assembler adds that). No other sections. Use var(--acc) etc. for all colors. Include the ❖ divider before the section content EXCEPT for the hook section. No markdown, no code fences.`);

  return parts.join("\n");
}

/** Build the root wrapper + CSS variables that the assembler wraps around sections. */
export function buildRootWrapper(req: BioGenerateRequest): string {
  const palette = PALETTES[req.palette] ?? PALETTES.teal;
  return `<div style="--acc:${palette.acc};--acc2:${palette.acc2};--bg:${palette.bg};--card:${palette.card};--line:${palette.line};--txt:${palette.txt};--mut:${palette.mut};width:min(100%,52rem);margin:0 auto;border-radius:1rem;overflow:hidden;background:var(--bg);color:var(--txt);border:1px solid var(--line);font-family:Inter,system-ui,sans-serif;">\n<div style="padding:1rem 1.1rem 1.4rem;">\n__SECTIONS__\n</div>\n</div>`;
}
