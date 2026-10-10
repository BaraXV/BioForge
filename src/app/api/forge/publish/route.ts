/**
 * Publish proxy — forwards the bio HTML to the JanitorAI API via the
 * Cloudflare Worker, avoiding browser CORS restrictions.
 *
 * This route is server-side only; the worker URL and token never appear in
 * client bundles beyond what the user pasted.
 */

import { NextRequest, NextResponse } from "next/server";

const WORKER_URL = "https://yellow-sun-0975.rainer-burner-15.workers.dev/";

type PublishMode = "both" | "draft" | "published";

function isPublishMode(x: unknown): x is PublishMode {
  return x === "both" || x === "draft" || x === "published";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, token, html, publishMode } = body as {
      url?: string;
      token?: string;
      html?: string;
      publishMode?: unknown;
    };

    if (!url || !token || typeof html !== "string") {
      return NextResponse.json(
        { ok: false, error: "Missing url, token, or html" },
        { status: 400 },
      );
    }

    // Forward the draft/published selection if provided. NOTE: the worker
    // would need to be updated to honour this field (out of scope for this
    // task). Until then it is sent as best-effort metadata — the worker
    // currently publishes to both draft and published for script targets
    // regardless of this value.
    const workerBody: Record<string, unknown> = { url, token, html };
    if (isPublishMode(publishMode)) {
      workerBody.publishMode = publishMode;
    }

    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(workerBody),
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { ok: false, status: res.status, response: text.slice(0, 400) };
    }

    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Unknown proxy error",
      },
      { status: 500 },
    );
  }
}
