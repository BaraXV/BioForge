/**
 * Bio generation prompt builder.
 *
 * Constructs the system + user prompts for the LLM that generate JanitorAI
 * character bios following the "house format" structure.
 */

export interface BioGenerateRequest {
  /** Free-form theme description, e.g., "cozy seaside cafe", "neon cyberpunk bar". */
  theme: string;
  /** Tone / mood of the bio. */
  tone: "wholesome" | "dark" | "comedic" | "mysterious" | "romantic" | "adventurous";
  /** Number of characters to include (1-4). */
  characterCount: number;
  /** Color palette preset name. */
  palette: "teal" | "ember" | "gold" | "purple" | "forest" | "rose" | "ocean" | "mono";
  /** Which sections to include. */
  sections: {
    hook: boolean;
    intro: boolean;
    about: boolean;
    howItWorks: boolean;
    characters: boolean;
    gallery: boolean;
    howToPlay: boolean;
    scenarios: boolean;
    cta: boolean;
  };
  /** Optional extra instructions (e.g., "include a magic system", "set in winter"). */
  extraInstructions?: string;
  /** Optional setting/genre keywords. */
  setting?: string;
}

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

export function buildSystemPrompt(): string {
  return `You are an expert HTML bio designer for JanitorAI character cards. You write richly-structured, visually-styled HTML bios using inline CSS only (no <style> tags, no <script>, no external classes).

CRITICAL RULES:
1. Output ONLY the bio HTML — no markdown fences, no explanations, no \`\`\`html wrapper.
2. Use ONLY inline styles on every element. Never use <style>, <script>, class="", id="", position:, z-index, or width:100vw.
3. The bio MUST start with a single root <div> that sets CSS custom properties (--acc, --acc2, --bg, --card, --line, --txt, --mut) and uses them throughout via var(--acc) etc.
4. Use the "house format": root <div> wrapper > inner <div> container > content sections.
5. Make it fully responsive: use display:grid with grid-template-columns:repeat(auto-fit,minmax(11rem,1fr)) for card grids. Never use fixed pixel widths on containers.
6. Use <details>/<summary> for collapsible character intros and scenarios. Give each <details> a name attribute.
7. Section dividers use this pattern: <div style="margin:1.6rem 0 .8rem;text-align:center;font-size:.7rem;font-weight:800;letter-spacing:.35em;color:var(--acc);">❖ SECTION NAME ❖</div>
8. Write rich, immersive, in-character prose. The intro section should have a strong narrative "hook" voice (second person, conversational, slightly theatrical). Each character needs a distinct personality.
9. For images, use placeholder URLs like https://ella.janitorai.com/media-approved/PLACEHOLDER.webp — the user will replace them. Include 2-3 gallery images per character.
10. Include {{user}} in the premise/scenario text where the user's persona goes.
11. Keep the total length substantial (3000-6000 chars) but not bloated. Every section earns its place.
12. Use decorative unicode (❖ ✦ ◆ ▾ ➤) sparingly for accents.
13. End with a CTA section (discord/credits link).

STRUCTURE (include the sections the user requests, in this order):
- HOOK: A hero area with a background image (use grid overlay technique: grid-template-columns:1fr with stacked children — one for the bg image, one for a gradient overlay, one for the tagline text at the bottom).
- INTRO: A bordered callout block with a conversational greeting/instructions (border-left:3px solid var(--acc), background tinted with the accent at low opacity). This is the "yap section" — write it in a lively, characterful voice.
- ABOUT: One or two bordered cards explaining the setting/premise.
- HOW IT WORKS: A responsive grid of small info cards (3-4 cards explaining key mechanics/concepts).
- CHARACTERS: For each character, a <details> block with: summary row (name + meta line), a portrait image (flex:0 0 11rem, aspect-ratio:2/3), a description paragraph, and an "affection meter" bar (a div with a colored fill at a low percentage). Use different border-left colors per character.
- GALLERY: A horizontal scroll-snap row (display:flex, overflow-x:auto, scroll-snap-type:x mandatory) of portrait cards.
- HOW TO PLAY: A responsive grid of guidance cards (persona suggestion, tone, etc.).
- SCENARIOS: 2-3 <details> blocks, each with a scenario title and a short setup paragraph.
- CTA: A centered button-style link + a small credits line.

VOICE: Write with personality. The intro should feel like a narrator setting the scene — warm but specific, with humor where appropriate. Avoid generic fantasy boilerplate. Make the setting feel lived-in and real.`;
}

export function buildUserPrompt(req: BioGenerateRequest): string {
  const palette = PALETTES[req.palette] ?? PALETTES.teal;
  const sectionList: string[] = [];
  if (req.sections.hook) sectionList.push("HOOK (hero image + tagline)");
  if (req.sections.intro) sectionList.push("INTRO (bordered callout, conversational hook)");
  if (req.sections.about) sectionList.push("ABOUT (premise/setting cards)");
  if (req.sections.howItWorks) sectionList.push("HOW IT WORKS (mechanics grid)");
  if (req.sections.characters) sectionList.push(`CHARACTERS (${req.characterCount} character intro blocks with portraits)`);
  if (req.sections.gallery) sectionList.push("GALLERY (horizontal scroll of portraits)");
  if (req.sections.howToPlay) sectionList.push("HOW TO PLAY (guidance cards)");
  if (req.sections.scenarios) sectionList.push("SCENARIOS (2-3 collapsible scenarios)");
  if (req.sections.cta) sectionList.push("CTA (discord/credits link)");

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
  parts.push(`NUMBER OF CHARACTERS: ${req.characterCount}`);
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
  parts.push(`SECTIONS TO INCLUDE (in this order):`);
  for (const s of sectionList) parts.push(`  - ${s}`);
  parts.push(``);
  if (req.extraInstructions) {
    parts.push(`ADDITIONAL INSTRUCTIONS:`);
    parts.push(req.extraInstructions);
    parts.push(``);
  }
  parts.push(`REMEMBER: Output ONLY the raw HTML. No markdown, no code fences, no explanation. Start with <div and end with </div>. Use inline styles only. Use CSS variables (var(--acc) etc.) for all colors.`);

  return parts.join("\n");
}
