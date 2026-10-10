/**
 * Block-level HTML formatter.
 *
 * Indents block-level tags while keeping inline tags (<span>, <strong>, etc.)
 * on the same line as their surrounding text. Preserves <pre> blocks and
 * HTML comments verbatim. Preserves numeric character entities (&#9670;).
 */

const VOIDF = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

const INLINE_TAGS = new Set([
  "span", "strong", "em", "b", "i", "u", "a", "code", "mark", "small",
  "sub", "sup",
]);

export function formatSource(html: string): string {
  if (!html.trim()) return html;
  const out: string[] = [];
  let indent = 0;
  let pos = 0;
  const re =
    /(<pre[\s\S]*?<\/pre>)|(<!--[\s\S]*?-->)|(<\/?[a-zA-Z][^>]*?(?:"[^"]*"|'[^']*'|[^>"'])*>)/g;
  let m: RegExpExecArray | null;
  const pad = (n: number) => (n === 0 ? "" : "  ".repeat(n));

  while ((m = re.exec(html)) !== null) {
    // <pre> blocks — preserve verbatim
    if (m[1]) {
      const preBefore = html.slice(pos, m.index).trim();
      if (preBefore) out.push(pad(indent) + preBefore.replace(/\s+/g, " "));
      out.push(pad(indent) + m[1]);
      pos = re.lastIndex;
      continue;
    }
    // Comments — preserve verbatim
    if (m[2]) {
      const cBefore = html.slice(pos, m.index).trim();
      if (cBefore) out.push(pad(indent) + cBefore.replace(/\s+/g, " "));
      out.push(pad(indent) + m[2]);
      pos = re.lastIndex;
      continue;
    }
    // Tag
    const tok = m[3];
    const nm = /^<\/?([a-zA-Z][a-zA-Z0-9-]*)/.exec(tok);
    const name = nm ? nm[1].toLowerCase() : "";
    const isInline = INLINE_TAGS.has(name);
    const text = html.slice(pos, m.index);

    if (isInline) {
      if (text) out.push(text);
    } else {
      const t2 = text.trim();
      if (t2) out.push(pad(indent) + t2.replace(/\s+/g, " "));
    }
    pos = re.lastIndex;

    if (isInline) {
      out.push(tok);
      continue;
    }

    const closing = tok.charAt(1) === "/";
    let self = /\/>\s*$/.test(tok) || VOIDF.has(name);
    // BUGFIX (original): <div ... /> is NOT self-closing in HTML5
    if (name === "div" && /\/>\s*$/.test(tok)) self = false;

    if (closing) {
      indent = Math.max(0, indent - 1);
      out.push(pad(indent) + tok);
    } else if (self) {
      out.push(pad(indent) + tok);
    } else {
      out.push(pad(indent) + tok);
      indent++;
    }
  }
  const tail = html.slice(pos).trim();
  if (tail) out.push(pad(indent) + tail.replace(/\s+/g, " "));
  return out.join("\n");
}
