/**
 * Bio generation API route — generates a complete JanitorAI bio HTML from a
 * theme + preferences using an OpenAI-compatible LLM.
 *
 * Configuration (via environment variables in .env.local):
 *   - OPENAI_API_KEY  — your API key (required)
 *   - OPENAI_BASE_URL — base URL (optional; defaults to OpenAI)
 *   - OPENAI_MODEL    — model name (optional; defaults to gpt-4o)
 *
 * Works with: OpenAI, OpenRouter, Google Gemini (via OpenAI compat),
 * Groq, Together, Ollama, LM Studio, and any OpenAI-compatible endpoint.
 *
 * Falls back to z-ai-web-dev-sdk if available (for sandbox environments).
 */

import { NextRequest, NextResponse } from "next/server";
import {
  buildSystemPrompt,
  buildUserPrompt,
  type BioGenerateRequest,
} from "@/lib/forge/bioGenerator";

export const maxDuration = 60;

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
  t = t.replace(/^```(?:html)?\s*\n?/i, "");
  t = t.replace(/\n?```\s*$/i, "");
  return t.trim();
}

/** Try to generate using z-ai-web-dev-sdk (sandbox environment). */
async function generateWithZai(
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
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

/** Generate using OpenAI-compatible API. */
async function generateWithOpenAI(
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  const OpenAI = (await import("openai")).default;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Create a .env.local file with your API key. " +
        "See PUSH_INSTRUCTIONS.md for setup details.",
    );
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
    temperature: 0.8,
    max_tokens: 4000,
  });
  return completion.choices[0]?.message?.content ?? "";
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

    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(request);

    let raw = "";
    let provider = "";

    // Try OpenAI-compatible API first (user's local setup)
    if (process.env.OPENAI_API_KEY) {
      try {
        raw = await generateWithOpenAI(systemPrompt, userPrompt);
        provider = process.env.OPENAI_BASE_URL
          ? new URL(process.env.OPENAI_BASE_URL).hostname
          : "openai";
      } catch (e) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "LLM request failed: " +
              (e instanceof Error ? e.message : String(e)),
          },
          { status: 502 },
        );
      }
    } else {
      // Fall back to z-ai-web-dev-sdk (sandbox environment)
      try {
        raw = await generateWithZai(systemPrompt, userPrompt);
        provider = "z-ai-sandbox";
      } catch (e) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "No LLM configured. To use the bio generator, you need to set up an API key.\n\n" +
              "Option 1 (OpenAI): Get a key from https://platform.openai.com/api-keys, " +
              "then create a .env.local file in your project with:\n" +
              "  OPENAI_API_KEY=sk-your-key-here\n\n" +
              "Option 2 (OpenRouter — free models available): Get a key from " +
              "https://openrouter.ai/keys, then create .env.local with:\n" +
              "  OPENAI_API_KEY=sk-or-your-key\n" +
              "  OPENAI_BASE_URL=https://openrouter.ai/api/v1\n" +
              "  OPENAI_MODEL=meta-llama/llama-3.3-70b-instruct:free\n\n" +
              "Option 3 (local LLM via Ollama): Install Ollama from https://ollama.com, " +
              "run 'ollama pull llama3.1', then set:\n" +
              "  OPENAI_API_KEY=ollama\n" +
              "  OPENAI_BASE_URL=http://localhost:11434/v1\n" +
              "  OPENAI_MODEL=llama3.1\n\n" +
              "After creating .env.local, restart 'bun run dev'.\n\n" +
              "(Sandbox error: " +
              (e instanceof Error ? e.message : String(e)) +
              ")",
          },
          { status: 500 },
        );
      }
    }

    if (!raw.trim()) {
      return NextResponse.json(
        { ok: false, error: "The model returned an empty response. Try again." },
        { status: 502 },
      );
    }

    const html = stripFences(raw);

    if (!/<div[\s>]/i.test(html)) {
      return NextResponse.json(
        {
          ok: false,
          error: "The model response did not contain valid HTML. Try rephrasing your theme.",
          raw: raw.slice(0, 500),
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      html,
      chars: html.length,
      sections: request.sections,
      palette: request.palette,
      provider,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown generation error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
