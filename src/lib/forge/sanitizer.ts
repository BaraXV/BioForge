/**
 * HTML sanitizer for the preview iframe.
 *
 * Strips event handlers, scripts, and other active content so pasting foreign
 * HTML into the editor is safe to render.
 *
 * BUGFIX vs original:
 *  - Also strips <iframe>, <object>, <embed>, <link rel=import> tags
 *  - Only strips javascript: in href/src/style attributes (not in display text)
 */

/**
 * Sanitize HTML for safe preview rendering.
 * Returns a new string with active content removed.
 */
export function sanitize(html: string): string {
  return html
    // Remove on* event handlers in double-quoted attributes.
    // The lookbehind `(?<=^|[\s/])` requires the attribute to be preceded by
    // start-of-string, whitespace, or a `/` (e.g. `<img/onerror=...>` — a
    // known bypass vector where attributes are slash-separated) without
    // consuming the separator, so we don't accidentally join two adjacent
    // attribute tokens.
    .replace(/(?<=^|[\s\/])on[a-z]+\s*=\s*"[^"]*"/gi, "")
    // Remove on* event handlers in single-quoted attributes
    .replace(/(?<=^|[\s\/])on[a-z]+\s*=\s*'[^']*'/gi, "")
    // Remove on* event handlers in unquoted attributes
    .replace(/(?<=^|[\s\/])on[a-z]+\s*=\s*[^\s>]+/gi, "")
    // Remove <script>...</script> blocks
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    // BUGFIX: also strip other active embed vectors
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?<\/embed>/gi, "")
    // Remove <link rel="import"> (HTML imports)
    .replace(/<link\b[^>]*rel\s*=\s*["']?import["']?[^>]*>/gi, "")
    // BUGFIX: only strip javascript: inside href/src/style, not in text nodes.
    // Use a function to check the preceding attribute name.
    .replace(
      /(href|src|action|formaction|xlink:href|data|style)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,
      (match, _attr, _val) => match.replace(/javascript:/gi, ""),
    );
}
