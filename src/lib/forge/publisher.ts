/**
 * Target URL parser + publish/build helpers for JanitorAI.
 *
 * BUGFIX vs original:
 *  - UUID regex is now strict ([0-9a-f]{8}-[0-9a-f]{4}-... ) instead of the
 *    loose [0-9a-f-]{36} which could match arbitrary dash-hex strings.
 */

export interface ParsedTarget {
  kind: "character" | "script";
  uuid: string;
}

const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

export function parseTarget(url: string): ParsedTarget | null {
  const u = url.trim();
  let m = /janitorai\.com\/characters\/([0-9a-f-]{36})/i.exec(u);
  if (m && UUID_RE.test(m[1])) return { kind: "character", uuid: m[1] };
  m = /janitorai\.com\/scripts\/([0-9a-f-]{36})/i.exec(u);
  if (m && UUID_RE.test(m[1])) return { kind: "script", uuid: m[1] };
  return null;
}

/**
 * Parse a comma- and newline-separated target field into a list of non-empty
 * URL strings. Used by multi-target publish. Each candidate is trimmed; the
 * caller is expected to run parseTarget on each result.
 */
export function parseTargetList(field: string): string[] {
  if (!field) return [];
  // Split on commas, newlines, or both. Trim and drop empties.
  const parts = field
    .split(/[,\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  // De-duplicate while preserving order (case-insensitive).
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of parts) {
    const key = p.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(p);
    }
  }
  return out;
}

/**
 * Decode the `exp` field from a JWT. JanitorAI tokens are JWTs; the middle
 * base64 segment carries the payload. Returns the expiry as a Unix timestamp
 * (seconds), or null if the token is malformed or has no `exp`.
 *
 * URL-safe base64 is normalised first (`-` → `+`, `_` → `/`), then padded
 * to a multiple of 4 before atob().
 */
export function decodeJwtExp(token: string): number | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.trim().split(".");
  if (parts.length < 2) return null;
  let seg = parts[1];
  // URL-safe base64 → standard
  seg = seg.replace(/-/g, "+").replace(/_/g, "/");
  // Pad to a multiple of 4
  while (seg.length % 4 !== 0) seg += "=";
  let json: string;
  try {
    // atob() is available in browsers and modern Node (>=16). The result is
    // a binary string — decode UTF-8 so non-ASCII payload chars survive.
    const bin = atob(seg);
    // Convert binary string → UTF-8 string (handles multibyte claims).
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    json = new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
  let payload: unknown;
  try {
    payload = JSON.parse(json);
  } catch {
    return null;
  }
  if (!payload || typeof payload !== "object") return null;
  const exp = (payload as { exp?: unknown }).exp;
  if (typeof exp !== "number" || !Number.isFinite(exp)) return null;
  return exp;
}

/**
 * Build a console-script the user can paste into a JanitorAI tab to publish
 * the current editor content (fallback when the Worker is unreachable).
 *
 * For script targets, `publishMode` selects which content slot(s) to write:
 *  - "both"       (default): writes draft + published
 *  - "draft":     writes draft only
 *  - "published": writes published only
 * Characters ignore the mode (no draft/published distinction) — the PATCH
 * is sent as-is.
 */
export function buildConsoleScript(
  target: ParsedTarget,
  token: string,
  html: string,
  publishMode: "both" | "draft" | "published" = "both",
): string {
  const payload = JSON.stringify(html);
  if (target.kind === "character") {
    const url = `https://janitorai.com/mb/characters/${target.uuid}`;
    return [
      "(async () => {",
      `  const r = await fetch("${url}", {`,
      '    method: "PATCH", credentials: "include",',
      `    headers: { "content-type": "application/json", "authorization": "Bearer ${token}" },`,
      `    body: JSON.stringify({ description: ${payload} })`,
      "  });",
      '  console.log(r.ok ? "FORGE: published." : "FORGE rejected " + r.status);',
      "})();",
    ].join("\n");
  }
  const url = `https://janitorai.com/hampter/script/${target.uuid}/content`;
  const types =
    publishMode === "both" ? ["draft", "published"] : [publishMode];
  const typesLit = JSON.stringify(types);
  return [
    "(async () => {",
    `  for (const type of ${typesLit}) {`,
    `    const r = await fetch("${url}", {`,
    '      method: "PUT", credentials: "include",',
    `      headers: { "content-type": "application/json", "authorization": "Bearer ${token}" },`,
    `      body: JSON.stringify({ type: type, content: ${payload} })`,
    "    });",
    '    console.log("FORGE (" + type + "):", r.ok ? "ok" : "rejected " + r.status);',
    "  }",
    "})();",
    ].join("\n");
}

/**
 * Build a console-script that loads the current live bio content for diffing.
 */
export function buildLoadScript(target: ParsedTarget, token: string): string {
  const path =
    target.kind === "character"
      ? `/hampter/characters/${target.uuid}`
      : `/hampter/script/${target.uuid}/content?type=published`;
  const accessor = target.kind === "character" ? "d.description" : "d.content";
  return [
    "(async () => {",
    `  const r = await fetch("https://janitorai.com${path}", {`,
    '    method: "GET", credentials: "include",',
    `    headers: { "content-type": "application/json", "authorization": "Bearer ${token}" }`,
    "  });",
    "  const d = await r.json();",
    `  const c = ${accessor};`,
    '  if (typeof c === "string") { console.log("=== FORGE LIVE: COPY BELOW ==="); console.log(c); console.log("=== END ==="); }',
    '  else console.log("FORGE: no content");',
    "})();",
  ].join("\n");
}

/**
 * Cookie-based auth token extractor (run on janitorai.com tab).
 */
export const TOKEN_SCRIPT = [
  "(() => {",
  "  function getCookie(name) {",
  "    const value = `; ${document.cookie}`;",
  "    const parts = value.split(`; ${name}=`);",
  '    if (parts.length === 2) return parts.pop().split(";").shift();',
  "    return null;",
  "  }",
  '  const cm = document.cookie.match(/(?:^|;\\s*)(sb-[^=]+-auth-token)(?:\\.\\d+)?=/);',
  '  const base = cm ? cm[1] : "sb-auth-auth-token";',
  "  let raw = getCookie(base);",
  "  if (!raw) {",
  "    const chunks = [];",
  "    for (let i = 0; ; i++) {",
  "      const c = getCookie(`${base}.${i}`);",
  "      if (c === null) break;",
  "      chunks.push(c);",
  "    }",
  '    if (chunks.length > 0) raw = chunks.join("");',
  "  }",
  '  if (!raw) { console.log("No token found"); return; }',
  "  try {",
  '    let j = "";',
  '    if (raw.startsWith("base64-")) {',
  '      let b64 = raw.slice(7).replace(/-/g, "+").replace(/_/g, "/");',
  '      while (b64.length % 4) b64 += "=";',
  '      const bin = atob(b64);',
  '      const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));',
  '      j = new TextDecoder().decode(bytes);',
  '    } else { j = decodeURIComponent(raw); }',
  "    const json = JSON.parse(j);",
  '    if (json?.access_token) console.log(json.access_token);',
  '    else console.log("No access token found");',
  "  } catch (e) { console.error(\"Failed to parse token\", e); }",
  "})();",
].join("\n");
