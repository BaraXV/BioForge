/**
 * Bio generation API route — generates, improves, or regenerates sections of
 * JanitorAI bio HTML using an OpenAI-compatible LLM.
 *
 * Modes:
 *   - "generate"           — generate from scratch (theme → bio)
 *   - "improve"            — rewrite an existing bio in a new style (4.1)
 *   - "regenerate-section" — rewrite just one section of an existing bio (2.3)
 *
 * Options:
 *   - highQuality: true  — use section-by-section generation (1.4)
 *   - Caching is built-in (3.4) — identical requests return cached result
 *
 * Configuration via environment variables in .env.local:
 *   - OPENAI_API_KEY  — required (your API key)
 *   - OPENAI_BASE_URL — optional (for OpenRouter, Gemini, Groq, Ollama)
 *   - OPENAI_MODEL    — optional (defaults to gpt-4o)
 *
 * Falls back to z-ai-web-dev-sdk if no OPENAI_API_KEY (sandbox only).
 */

import { NextRequest, NextResponse } from "next/server";
import {
  buildSystemPrompt,
  buildUserPrompt,
  buildImprovePrompt,
  buildRegenerateSectionPrompt,
  buildSectionPrompt,
  buildRootWrapper,
  getSectionSpecs,
  PALETTES,
  type BioGenerateRequest,
  type SectionName,
} from "@/lib/forge/bioGenerator";

export const maxDuration = 120; // Allow up to 2 min for section-by-section generation

// ============================================================
// In-memory cache (3.4)
// ============================================================

interface CacheEntry {
  html: string;
  timestamp: number;
  provider: string;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function hashRequest(req: BioGenerateRequest): string {
  // Simple hash of the request — good enough for cache keying
  const json = JSON.stringify({
    mode: req.mode,
    theme: req.theme,
    tone: req.tone,
    characters: req.characters,
    characterCount: req.characterCount,
    palette: req.palette,
    sections: req.sections,
    styleIntensity: req.styleIntensity,
    extraInstructions: req.extraInstructions,
    setting: req.setting,
    existingBio: req.existingBio?.length, // length only, not full content (for improve mode)
    regenerateSectionName: req.regenerateSectionName,
    highQuality: req.highQuality,
    creativity: req.creativity,
  });
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    const ch = json.charCodeAt(i);
    hash = ((hash << 5) - hash + ch) | 0;
  }
  return "gen_" + Math.abs(hash).toString(36);
}

// ============================================================
// Request validation
// ============================================================

function validateRequest(body: unknown): BioGenerateRequest | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (typeof b.theme !== "string" && b.mode !== "regenerate-section") return null;

  const validTones = ["wholesome", "dark", "comedic", "mysterious", "romantic", "adventurous"];
  const validPalettes = ["teal", "ember", "gold", "purple", "forest", "rose", "ocean", "mono"];
  const validModes = ["generate", "improve", "regenerate-section"];
  const validSections = ["hook", "intro", "about", "howItWorks", "characters", "gallery", "howToPlay", "scenarios", "cta"];

  const mode = validModes.includes(b.mode as string) ? (b.mode as string) : "generate";
  const tone = validTones.includes(b.tone as string) ? (b.tone as string) : "wholesome";
  const palette = validPalettes.includes(b.palette as string) ? (b.palette as string) : "teal";
  const characterCount = Math.max(1, Math.min(4, Number(b.characterCount) || 2));
  const styleIntensity = ([1, 2, 3, 4, 5].includes(Number(b.styleIntensity) as number)
    ? Number(b.styleIntensity)
    : 3) as 1 | 2 | 3 | 4 | 5;

  const sectionsIn = b.sections as Record<string, unknown> | undefined;
  const sections: Record<SectionName, boolean> = {
    hook: true, intro: true, about: true, howItWorks: true,
    characters: true, gallery: true, howToPlay: true, scenarios: true, cta: true,
  };
  if (sectionsIn) {
    for (const k of validSections) {
      if (sectionsIn[k] === false) (sections as Record<string, boolean>)[k] = false;
    }
  }

  // Validate characters array
  let characters: BioGenerateRequest["characters"] | undefined;
  if (Array.isArray(b.characters)) {
    characters = (b.characters as unknown[]).slice(0, 4).map((c) => {
      const c2 = c as Record<string, unknown>;
      return {
        name: String(c2.name || ""),
        species: String(c2.species || ""),
        age: String(c2.age || ""),
        personality: String(c2.personality || ""),
        relationship: String(c2.relationship || ""),
        affection: Math.max(0, Math.min(100, Number(c2.affection) || 0)),
      };
    });
    if (characters.length === 0) characters = undefined;
  }

  return {
    mode: mode as BioGenerateRequest["mode"],
    theme: typeof b.theme === "string" ? b.theme.trim() : "",
    tone: tone as BioGenerateRequest["tone"],
    characterCount,
    characters,
    palette: palette as BioGenerateRequest["palette"],
    sections,
    styleIntensity,
    extraInstructions: typeof b.extraInstructions === "string" ? b.extraInstructions : undefined,
    setting: typeof b.setting === "string" ? b.setting : undefined,
    existingBio: typeof b.existingBio === "string" ? b.existingBio : undefined,
    regenerateSectionName: validSections.includes(b.regenerateSectionName as string)
      ? (b.regenerateSectionName as SectionName) : undefined,
    currentBio: typeof b.currentBio === "string" ? b.currentBio : undefined,
    highQuality: b.highQuality === true,
    creativity: ([1, 2, 3].includes(Number(b.creativity)) ? Number(b.creativity) : 2) as 1 | 2 | 3,
  };
}

/** Strip markdown code fences if the LLM added them. */
function stripFences(text: string): string {
  let t = text.trim();
  t = t.replace(/^```(?:html)?\s*\n?/i, "");
  t = t.replace(/\n?```\s*$/i, "");
  return t.trim();
}

// ============================================================
// LLM providers
// ============================================================

async function generateWithZai(systemPrompt: string, userPrompt: string): Promise<string> {
  const ZAI = (await import("z-ai-web-dev-sdk")).default;
  const zai = await ZAI.create();
  const completion = await zai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    thinking: { type: "disabled" },
  });
  return completion.choices[0]?.message?.content ?? "";
}

async function generateWithOpenAI(systemPrompt: string, userPrompt: string, options?: { maxTokens?: number }): Promise<string> {
  const OpenAI = (await import("openai")).default;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set. Create a .env.local file with your API key.");
  }
  const client = new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL || undefined,
  });
  const model = process.env.OPENAI_MODEL || "gpt-4o";
  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.85,
    // Don't set max_tokens unless explicitly requested — let the model use
    // its full output capacity. Many models (Gemini Flash = 8192 tokens ≈ 32k
    // chars) default to a reasonable max. Setting max_tokens: 6000 was
    // artificially capping output and causing the LLM to trim/summarize
    // long bios instead of preserving them.
    ...(options?.maxTokens ? { max_tokens: options.maxTokens } : {}),
  });
  return completion.choices[0]?.message?.content ?? "";
}

async function callLLM(systemPrompt: string, userPrompt: string, options?: { maxTokens?: number }): Promise<{ text: string; provider: string }> {
  if (process.env.OPENAI_API_KEY) {
    const text = await generateWithOpenAI(systemPrompt, userPrompt, options);
    const provider = process.env.OPENAI_BASE_URL
      ? new URL(process.env.OPENAI_BASE_URL).hostname
      : "openai";
    return { text, provider };
  }
  // Fallback: z-ai sandbox
  const text = await generateWithZai(systemPrompt, userPrompt);
  return { text, provider: "z-ai-sandbox" };
}

// ============================================================
// Main POST handler
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const request = validateRequest(body);

    if (!request) {
      return NextResponse.json(
        { ok: false, error: "Invalid request. 'theme' is required." },
        { status: 400 },
      );
    }

    // Check cache (3.4)
    const cacheKey = hashRequest(request);
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({
        ok: true,
        html: cached.html,
        chars: cached.html.length,
        cached: true,
        provider: cached.provider,
      });
    }

    const systemPrompt = buildSystemPrompt(request.creativity ?? 2);
    let html = "";
    let provider = "";

    // ---- Mode: regenerate-section (2.3) ----
    if (request.mode === "regenerate-section") {
      if (!request.currentBio) {
        return NextResponse.json(
          { ok: false, error: "currentBio is required for regenerate-section mode." },
          { status: 400 },
        );
      }
      const userPrompt = buildRegenerateSectionPrompt(request);
      const { text, provider: p } = await callLLM(systemPrompt, userPrompt);
      html = stripFences(text);
      provider = p;
    }

    // ---- Mode: improve (4.1) ----
    else if (request.mode === "improve") {
      if (!request.existingBio) {
        return NextResponse.json(
          { ok: false, error: "existingBio is required for improve mode." },
          { status: 400 },
        );
      }
      const userPrompt = buildImprovePrompt(request);
      const { text, provider: p } = await callLLM(systemPrompt, userPrompt);
      html = stripFences(text);
      provider = p;
    }

    // ---- Mode: generate (with optional high-quality section-by-section) ----
    else {
      if (request.highQuality) {
        // Section-by-section generation (1.4)
        const specs = getSectionSpecs(request);
        const sectionHtmls: string[] = [];

        for (const spec of specs) {
          const sectionUserPrompt = buildSectionPrompt(request, spec);
          const { text } = await callLLM(systemPrompt, sectionUserPrompt);
          sectionHtmls.push(stripFences(text));
        }

        // Assemble: wrap sections in the root wrapper
        const wrapper = buildRootWrapper(request);
        html = wrapper.replace("__SECTIONS__", sectionHtmls.join("\n"));
        provider = process.env.OPENAI_API_KEY
          ? (process.env.OPENAI_BASE_URL ? new URL(process.env.OPENAI_BASE_URL).hostname : "openai")
          : "z-ai-sandbox";
      } else {
        // Single-call generation
        const userPrompt = buildUserPrompt(request);
        const { text, provider: p } = await callLLM(systemPrompt, userPrompt);
        html = stripFences(text);
        provider = p;
      }
    }

    if (!html.trim()) {
      return NextResponse.json(
        { ok: false, error: "The model returned an empty response. Try again." },
        { status: 502 },
      );
    }

    if (!/<div[\s>]/i.test(html)) {
      return NextResponse.json(
        { ok: false, error: "The model response did not contain valid HTML. Try rephrasing your theme." },
        { status: 502 },
      );
    }

    // Length-preservation check for improve mode — warn if the output is
    // significantly shorter than the input (the LLM trimmed/summarized
    // instead of preserving all content). This is a common failure mode
    // when the model hits its output token limit.
    let warning: string | undefined;
    if (request.mode === "improve" && request.existingBio) {
      const inputLen = request.existingBio.length;
      const outputLen = html.length;
      const ratio = outputLen / inputLen;
      if (ratio < 0.7) {
        warning =
          `The improved bio (${outputLen.toLocaleString()} chars) is significantly shorter than ` +
          `the original (${inputLen.toLocaleString()} chars, ${Math.round(ratio * 100)}% preserved). ` +
          `The LLM likely hit its output token limit and trimmed content. ` +
          `Try one of: (1) use a model with higher output limit, (2) use "Regen Section" mode to ` +
          `rewrite sections one at a time, or (3) use "High-quality mode" which generates ` +
          `section-by-section and can produce longer total output.`;
      }
    }

    // Cache the result (3.4) — don't cache if there's a warning (the user
    // will likely retry with different settings)
    if (!warning) {
      cache.set(cacheKey, { html, timestamp: Date.now(), provider });
    }

    return NextResponse.json({
      ok: true,
      html,
      chars: html.length,
      mode: request.mode,
      provider,
      cached: false,
      ...(warning ? { warning } : {}),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown generation error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
