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
 * Build a console-script the user can paste into a JanitorAI tab to publish
 * the current editor content (fallback when the Worker is unreachable).
 */
export function buildConsoleScript(
  target: ParsedTarget,
  token: string,
  html: string,
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
  return [
    "(async () => {",
    '  for (const type of ["draft", "published"]) {',
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
