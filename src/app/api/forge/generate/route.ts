/**
 * Bio generation API route — uses z-ai-web-dev-sdk LLM to generate a complete
 * JanitorAI bio HTML from a theme + preferences.
 */

import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import {
  buildSystemPrompt,
  buildUserPrompt,
  type BioGenerateRequest,
} from "@/lib/forge/bioGenerator";

export const maxDuration = 60; // Allow up to 60s for LLM generation

function validateRequest(body: unknown): BioGenerateRequest | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (typeof b.theme !== "string" || !b.theme.trim()) return null;

  const validTones = ["wholesome", "dark", "comedic", "mysterious", "romantic", "adventurous"];
  const validPalettes = ["teal", "ember", "gold", "purple", "forest", "rose", "ocean", "mono"];

  const tone = validTones.includes(b.tone as string) ? (b.tone as string) : "wholesome";
  const palette = validPalettes.includes(b.palette as string) ? (b.palette as string) : "teal";
  const characterCount = Math.max(1, Math.min(4, Number(b.characterCount) || 2));

  const sections = b.sections as Record<string, unknown> | undefined;
  const sectionDefaults = {
    hook: true, intro: true, about: true, howItWorks: true,
    characters: true, gallery: true, howToPlay: true, scenarios: true, cta: true,
  };

  return {
    theme: b.theme.trim(),
    tone: tone as BioGenerateRequest["tone"],
    characterCount,
    palette: palette as BioGenerateRequest["palette"],
    sections: {
      hook: sections?.hook !== false,
      intro: sections?.intro !== false,
      about: sections?.about !== false,
      howItWorks: sections?.howItWorks !== false,
      characters: sections?.characters !== false,
      gallery: sections?.gallery !== false,
      howToPlay: sections?.howToPlay !== false,
      scenarios: sections?.scenarios !== false,
      cta: sections?.cta !== false,
    },
    extraInstructions: typeof b.extraInstructions === "string" ? b.extraInstructions : undefined,
    setting: typeof b.setting === "string" ? b.setting : undefined,
  };
}

/** Strip markdown code fences if the LLM added them despite instructions. */
function stripFences(text: string): string {
  let t = text.trim();
  // Remove leading ```html or ```
  t = t.replace(/^```(?:html)?\s*\n?/i, "");
  // Remove trailing ```
  t = t.replace(/\n?```\s*$/i, "");
  return t.trim();
}

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

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: buildUserPrompt(request) },
      ],
      thinking: { type: "disabled" },
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    if (!raw.trim()) {
      return NextResponse.json(
        { ok: false, error: "The model returned an empty response. Try again." },
        { status: 502 },
      );
    }

    const html = stripFences(raw);

    // Basic sanity check: must contain a <div
    if (!/<div[\s>]/i.test(html)) {
      return NextResponse.json(
        { ok: false, error: "The model response did not contain valid HTML. Try rephrasing your theme.", raw: raw.slice(0, 500) },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      html,
      chars: html.length,
      sections: request.sections,
      palette: request.palette,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown generation error";
    return NextResponse.json(
      { ok: false, error: msg },
      { status: 500 },
    );
  }
}
