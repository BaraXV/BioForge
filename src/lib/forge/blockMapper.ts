/**
 * Block Mapper v5 — depth-aware HTML section parser.
 *
 * Parses an HTML source string and identifies "blocks" (top-level elements and
 * nested sections) so the editor can map preview clicks back to source lines.
 *
 * House format: wrapper > max-width container > sections (depth 2).
 */

export interface Block {
  line: number;
  tag: string;
  depth?: number;
}

export interface BlockMap {
  top: Block[];
  sub: Block[];
}

const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

const OPTIONAL_END = new Set([
  "p", "li", "dt", "dd", "option", "td", "th", "tr",
]);

export function buildBlockMap(source: string): BlockMap {
  const top: Block[] = [];
  const sub: Block[] = [];
  let stack: string[] = [];
  let topCount = 0;
  let inFirstWrapper = false;
  let i = 0;
  const len = source.length;

  // Pre-compute newline offsets for binary search line lookup
  const newlines: number[] = [];
  for (let k = 0; k < len; k++) {
    if (source.charAt(k) === "\n") newlines.push(k);
  }

  function lineAt(offset: number): number {
    let lo = 0, hi = newlines.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (newlines[mid] < offset) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  while (i < len) {
    if (source.charAt(i) === "<") {
      // Skip comments — they are not blocks
      if (source.substr(i, 4) === "<!--") {
        const endC = source.indexOf("-->", i);
        i = endC === -1 ? len : endC + 3;
        continue;
      }
      const m = /^<\/?([a-zA-Z][a-zA-Z0-9-]*)/.exec(source.substr(i, 60));
      if (m) {
        const isClose = source.charAt(i + 1) === "/";
        const name = m[1].toLowerCase();
        if (isClose) {
          const sIdx = stack.lastIndexOf(name);
          if (sIdx !== -1) stack = stack.slice(0, sIdx);
          if (stack.length === 0) inFirstWrapper = false;
          i += m[0].length;
          continue;
        }
        let j = i + m[0].length;
        let quote: string | null = null;
        while (j < len) {
          const c2 = source.charAt(j);
          if (quote) {
            if (c2 === quote) quote = null;
            j++;
            continue;
          }
          if (c2 === '"' || c2 === "'") {
            quote = c2;
            j++;
            continue;
          }
          if (c2 === ">") break;
          j++;
        }
        // Auto-close optional-end tags
        if (OPTIONAL_END.has(name)) {
          for (let s = stack.length - 1; s >= 0; s--) {
            if (OPTIONAL_END.has(stack[s]) || stack[s] === name) {
              stack = stack.slice(0, s);
              break;
            }
          }
        }
        let selfClose = source.charAt(j - 1) === "/" || VOID_TAGS.has(name);
        // BUGFIX (original line 376): <div ... /> is NOT self-closing in HTML5
        if (name === "div" && source.charAt(j - 1) === "/") selfClose = false;

        if (stack.length === 0) {
          top.push({ line: lineAt(i), tag: name });
          topCount++;
          inFirstWrapper = topCount === 1;
        } else if (stack.length === 1 && inFirstWrapper) {
          sub.push({ line: lineAt(i), depth: 1, tag: name });
        } else if (stack.length === 2 && inFirstWrapper) {
          sub.push({ line: lineAt(i), depth: 2, tag: name });
        }

        if (!selfClose) stack.push(name);
        i = j + 1;
        continue;
      }
    }
    i++;
  }
  return { top, sub };
}

/**
 * Build the "jump list" — the list of sections the user can navigate between.
 * If the document has a single top-level wrapper (the house format), descend
 * into depth-2 sections; otherwise use depth-1 children.
 */
export function getJumpList(src: string): Block[] {
  const m = buildBlockMap(src);
  if (m.top.length !== 1) return m.top;
  const d1 = m.sub.filter((s) => s.depth === 1);
  const d2 = m.sub.filter((s) => s.depth === 2);
  // House format: wrapper > single container div > sections at depth 2
  if (d1.length === 1 && d1[0].tag === "div" && d2.length >= 1) {
    return [m.top[0], ...d2];
  }
  return [m.top[0], ...(d1.length ? d1 : m.sub)];
}

export function jumpLine(index: number, src: string): number {
  const jl = getJumpList(src);
  if (index < 0 || index >= jl.length) return -1;
  return jl[index].line;
}

export function jumpCount(src: string): number {
  return getJumpList(src).length;
}
