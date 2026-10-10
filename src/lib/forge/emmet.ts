/**
 * Minimal Emmet-like abbreviation expander.
 *
 * Supports a useful subset of Emmet syntax — enough for rapidly scaffolding
 * bio HTML in the FORGE editor without pulling in a full Emmet runtime.
 *
 * Supported syntax:
 *   tag                 → <tag></tag>
 *   tag.class           → <tag class="class"></tag>
 *   tag#id              → <tag id="id"></tag>
 *   tag>c1>c2           → nested children
 *   tag+sib             → sibling (same depth)
 *   tag*N               → repeat the element N times
 *   tag{text}           → set text content (supports $ as 1-based index)
 *   .foo / #bar         → bare class/id defaults tag to <div>
 *
 * Not supported (intentionally): attribute syntax [attr=val], grouping (),
 * implicit tag names for siblings other than div.
 *
 * The expander returns pretty-printed HTML using 2-space indentation.
 */

const INDENT = "  ";

const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

interface EmmetNode {
  tag: string;
  id?: string;
  classes: string[];
  text?: string;
  repeat: number;
  children: EmmetNode[];
}

/**
 * Characters that may appear inside an Emmet abbreviation token. Used by the
 * editor's keydown handler to detect the abbreviation at the cursor.
 */
const ABBR_CHARS = /[a-zA-Z0-9.#>*+{}\-_]/;

/**
 * Detect whether the `>` at `pos` in `line` is the closing angle bracket of
 * an HTML tag (e.g. the `>` in `<div>` or `<div class="x">`). We use this
 * during the backwards abbreviation walk so we don't accidentally swallow a
 * preceding HTML tag and treat `</div>ul>li*3` as `div>ul>li*3`.
 *
 * Walks back from `pos` skipping over tag-internal characters (including
 * quoted attribute values). Returns true if we hit `<` before another `>`.
 */
function isHtmlTagClose(line: string, pos: number): boolean {
  let i = pos - 1;
  let inQuote: string | null = null;
  while (i >= 0) {
    const c = line[i];
    if (inQuote) {
      if (c === inQuote) inQuote = null;
      i--;
      continue;
    }
    if (c === '"' || c === "'") {
      inQuote = c;
      i--;
      continue;
    }
    if (c === "<") return true;
    if (c === ">") return false; // another tag-close — not our tag
    i--;
  }
  return false;
}

/**
 * Heuristic: a candidate string is treated as an abbreviation only when it
 * contains at least one Emmet operator character. This avoids surprising
 * users who press Tab after typing a plain word like "div" — they almost
 * always want a 2-space indent in that case, not an expanded tag.
 */
export function looksLikeAbbreviation(s: string): boolean {
  if (!s) return false;
  // Must contain at least one letter (so we don't expand random punctuation)
  if (!/[a-zA-Z]/.test(s)) return false;
  // Must contain at least one operator (so plain words stay as text)
  return /[.#>+*{}]/.test(s);
}

/**
 * Walk backwards from `cursorCol` over valid abbreviation chars and return
 * the abbreviation together with its start/end offsets, or null if no
 * plausible abbreviation is found. Stops at HTML tag-close brackets so we
 * don't merge with a preceding tag.
 */
export function detectAbbreviation(
  line: string,
  cursorCol: number,
): { abbr: string; start: number; end: number } | null {
  let start = cursorCol;
  while (start > 0) {
    const c = line[start - 1];
    if (!ABBR_CHARS.test(c)) break;
    if (c === ">" && isHtmlTagClose(line, start - 1)) {
      // The `>` belongs to a preceding HTML tag — stop without including it.
      break;
    }
    start--;
  }
  const abbr = line.slice(start, cursorCol);
  if (!looksLikeAbbreviation(abbr)) return null;
  return { abbr, start, end: cursorCol };
}

/**
 * Parse a single token like `tag.cls1.cls2#id*3{text}` into an EmmetNode.
 * The token must not contain `>` or `+` (those are handled by the tokenizer).
 */
function parseToken(tok: string): EmmetNode {
  const node: EmmetNode = {
    tag: "",
    classes: [],
    repeat: 1,
    children: [],
  };
  let i = 0;

  // Read tag name (alphanumeric + hyphen). May be empty for bare .cls / #id
  // (defaults to div).
  while (i < tok.length && /[a-zA-Z0-9-]/.test(tok[i])) {
    node.tag += tok[i];
    i++;
  }
  if (!node.tag) node.tag = "div";

  // Read .class / #id segments
  while (i < tok.length && (tok[i] === "." || tok[i] === "#")) {
    const sym = tok[i];
    i++;
    let val = "";
    while (i < tok.length && /[a-zA-Z0-9_-]/.test(tok[i])) {
      val += tok[i];
      i++;
    }
    if (!val) continue;
    if (sym === ".") node.classes.push(val);
    else node.id = val;
  }

  // Read *N repeat count
  if (i < tok.length && tok[i] === "*") {
    i++;
    let n = "";
    while (i < tok.length && /[0-9]/.test(tok[i])) {
      n += tok[i];
      i++;
    }
    const parsed = n ? parseInt(n, 10) : 1;
    // Cap the repeat count to prevent pathological inputs (e.g. `div*9999999`)
    // from freezing the editor. 1000 is well beyond any realistic use case.
    node.repeat = Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 1000) : 1;
  }

  // Read {text} content
  if (i < tok.length && tok[i] === "{") {
    i++;
    let text = "";
    while (i < tok.length && tok[i] !== "}") {
      text += tok[i];
      i++;
    }
    node.text = text;
  }

  return node;
}

/**
 * Tokenize `abbr` into a tree of EmmetNode using `>` (descend) and `+`
 * (sibling) operators. Returns the list of root nodes.
 */
function parseAbbreviation(abbr: string): EmmetNode[] {
  const roots: EmmetNode[] = [];
  // parentStack tracks ancestors whose children we are currently appending to.
  const parentStack: EmmetNode[] = [];

  let i = 0;
  while (i < abbr.length) {
    // Read a token until the next operator
    let tok = "";
    while (
      i < abbr.length &&
      abbr[i] !== ">" &&
      abbr[i] !== "+"
    ) {
      tok += abbr[i];
      i++;
    }
    if (!tok) {
      // Skip stray operator (e.g. abbr starts with `>`)
      if (i < abbr.length) i++;
      continue;
    }
    const node = parseToken(tok);
    if (parentStack.length === 0) {
      roots.push(node);
    } else {
      parentStack[parentStack.length - 1].children.push(node);
    }

    // Consume the operator (if any) and adjust parent stack
    if (i < abbr.length) {
      const op = abbr[i];
      i++;
      if (op === ">") {
        parentStack.push(node);
      }
      // for "+", parentStack is unchanged — next node is a sibling of `node`
    } else {
      break;
    }
  }

  return roots;
}

function substituteIndex(text: string, index: number): string {
  // Emmet uses `$` as a 1-based index inside `*N` repetitions.
  return text.replace(/\$/g, String(index));
}

function renderNode(node: EmmetNode, indent: string, lines: string[]): void {
  const tag = node.tag;
  const isVoid = VOID_TAGS.has(tag.toLowerCase());
  let attrs = "";
  if (node.id) attrs += ` id="${node.id}"`;
  if (node.classes.length > 0) attrs += ` class="${node.classes.join(" ")}"`;

  for (let r = 0; r < node.repeat; r++) {
    const text = node.text !== undefined ? substituteIndex(node.text, r + 1) : undefined;
    if (isVoid) {
      lines.push(`${indent}<${tag}${attrs} />`);
      continue;
    }
    const hasChildren = node.children.length > 0;
    const hasText = text !== undefined;
    if (!hasChildren && !hasText) {
      lines.push(`${indent}<${tag}${attrs}></${tag}>`);
    } else if (hasChildren && !hasText) {
      lines.push(`${indent}<${tag}${attrs}>`);
      for (const child of node.children) {
        renderNode(child, indent + INDENT, lines);
      }
      lines.push(`${indent}</${tag}>`);
    } else if (!hasChildren && hasText) {
      lines.push(`${indent}<${tag}${attrs}>${text}</${tag}>`);
    } else {
      // Both children and text — text first, then children
      lines.push(`${indent}<${tag}${attrs}>${text}`);
      for (const child of node.children) {
        renderNode(child, indent + INDENT, lines);
      }
      lines.push(`${indent}</${tag}>`);
    }
  }
}

/**
 * Expand an Emmet abbreviation into indented HTML. Returns null if the
 * abbreviation is malformed (e.g. an unclosed `{`).
 */
export function expandAbbreviation(abbr: string): string | null {
  if (!abbr || !looksLikeAbbreviation(abbr)) return null;
  try {
    const roots = parseAbbreviation(abbr);
    if (roots.length === 0) return null;
    const lines: string[] = [];
    for (const root of roots) {
      renderNode(root, "", lines);
    }
    return lines.join("\n");
  } catch {
    return null;
  }
}
