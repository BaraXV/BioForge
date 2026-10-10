"use client";

import { useRef, useEffect, useCallback, useState, useMemo } from "react";
import { useForge } from "@/store/forge/useForge";
import { getJumpList } from "@/lib/forge/blockMapper";
import {
  detectAbbreviation,
  expandAbbreviation,
} from "@/lib/forge/emmet";

const DEFAULT_FONT_SIZE = 13;
const MIN_FONT = 9;
const MAX_FONT = 28;
const INDENT = "  ";
const MINIMAP_WIDTH = 60;

const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

export default function CodeEditor() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const gutterInnerRef = useRef<HTMLDivElement | null>(null);
  const minimapRef = useRef<HTMLCanvasElement | null>(null);
  const syncLockRef = useRef(false);
  const suppressSyncRef = useRef(false);
  const minimapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Find/Replace UI state (local to this component)
  const [findQuery, setFindQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);

  const htmlContent = useForge((s) => s.html);
  const setHtml = useForge((s) => s.setHtml);
  const syncOn = useForge((s) => s.syncOn);
  const diffLines = useForge((s) => s.diffLines);
  const lineWrap = useForge((s) => s.lineWrap);
  const fontSize = useForge((s) => s.fontSize);
  const setFontSize = useForge((s) => s.setFontSize);
  const showLineNumbers = useForge((s) => s.showLineNumbers);
  const toggleLineNumbers = useForge((s) => s.toggleLineNumbers);
  const findReplaceOpen = useForge((s) => s.findReplaceOpen);
  const setFindReplaceOpen = useForge((s) => s.setFindReplaceOpen);
  const toast = useForge((s) => s.toast);

  // Derived line height (CSS line-height 1.5 * font-size, rounded down to match layout)
  const lineHeight = Math.floor(fontSize * 1.5);

  // Line count is derived from the current HTML — computed during render to
  // avoid the "setState-in-effect" pattern (and it's cheap: a single split).
  const lineCount = useMemo(() => htmlContent.split("\n").length, [htmlContent]);

  // ---------------------------------------------------------------------
  // Helpers for setting textarea value + restoring cursor position
  // ---------------------------------------------------------------------

  const applyEdit = useCallback(
    (
      ta: HTMLTextAreaElement,
      newValue: string,
      selStart: number,
      selEnd: number,
    ) => {
      setHtml(newValue);
      requestAnimationFrame(() => {
        ta.focus();
        ta.selectionStart = selStart;
        ta.selectionEnd = selEnd;
      });
    },
    [setHtml],
  );

  // ---------------------------------------------------------------------
  // Find & Replace helpers
  // ---------------------------------------------------------------------

  const buildMatcher = useCallback(
    (query: string, regex: boolean, caseSensitive: boolean): RegExp | null => {
      if (!query) return null;
      let pattern: string;
      if (regex) {
        pattern = query;
      } else {
        pattern = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      try {
        return new RegExp(pattern, caseSensitive ? "g" : "gi");
      } catch {
        return null;
      }
    },
    [],
  );

  const findAllMatches = useCallback(
    (text: string, re: RegExp): Array<{ start: number; end: number }> => {
      const out: Array<{ start: number; end: number }> = [];
      re.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null) {
        if (m[0].length === 0) {
          // Avoid infinite loop on zero-width matches
          re.lastIndex++;
          continue;
        }
        out.push({ start: m.index, end: m.index + m[0].length });
        if (m.index === re.lastIndex) re.lastIndex++;
      }
      return out;
    },
    [],
  );

  // Match count is derived from current inputs + HTML — computed during
  // render to avoid the "setState-in-effect" pattern.
  const matchCount = useMemo(() => {
    if (!findReplaceOpen) return 0;
    const re = buildMatcher(findQuery, useRegex, caseSensitive);
    if (!re) return 0;
    return findAllMatches(htmlContent, re).length;
  }, [findQuery, useRegex, caseSensitive, htmlContent, findReplaceOpen, buildMatcher, findAllMatches]);

  const findNext = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const re = buildMatcher(findQuery, useRegex, caseSensitive);
    if (!re) return;
    const matches = findAllMatches(ta.value, re);
    if (matches.length === 0) {
      toast("No matches.", "note");
      return;
    }
    const pos = ta.selectionEnd;
    const next = matches.find((m) => m.start >= pos) ?? matches[0];
    ta.focus();
    ta.setSelectionRange(next.start, next.end);
    // Scroll the match into view
    const linesBefore = ta.value.substring(0, next.start).split("\n").length - 1;
    ta.scrollTop = Math.max(0, linesBefore * lineHeight - ta.clientHeight / 3);
  }, [findQuery, useRegex, caseSensitive, buildMatcher, findAllMatches, toast, lineHeight]);

  const replaceOne = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const re = buildMatcher(findQuery, useRegex, caseSensitive);
    if (!re) return;

    // If current selection matches, replace it; otherwise find next match first.
    let target: { start: number; end: number } | null = null;
    if (ta.selectionStart !== ta.selectionEnd) {
      const sel = ta.value.substring(ta.selectionStart, ta.selectionEnd);
      re.lastIndex = 0;
      const m = re.exec(sel);
      if (m && m.index === 0 && m[0].length === sel.length) {
        target = { start: ta.selectionStart, end: ta.selectionEnd };
      }
    }
    if (!target) {
      const matches = findAllMatches(ta.value, re);
      if (matches.length === 0) {
        toast("No matches to replace.", "note");
        return;
      }
      const pos = ta.selectionStart;
      target = matches.find((m) => m.start >= pos) ?? matches[0];
    }

    // For regex mode, expand $&/$1/etc. by running a one-shot replace over the
    // matched substring. For plain mode, insert the replacement literally.
    let replacement = replaceQuery;
    if (useRegex) {
      const matchedText = ta.value.substring(target.start, target.end);
      try {
        const oneShot = new RegExp(re.source, caseSensitive ? "" : "i");
        replacement = matchedText.replace(oneShot, replaceQuery);
      } catch {
        replacement = replaceQuery;
      }
    }
    const newValue =
      ta.value.substring(0, target.start) +
      replacement +
      ta.value.substring(target.end);
    applyEdit(ta, newValue, target.start, target.start + replacement.length);
  }, [findQuery, replaceQuery, useRegex, caseSensitive, buildMatcher, findAllMatches, applyEdit, toast]);

  const replaceAll = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const re = buildMatcher(findQuery, useRegex, caseSensitive);
    if (!re) return;
    const matches = findAllMatches(ta.value, re);
    if (matches.length === 0) {
      toast("No matches to replace.", "note");
      return;
    }
    const count = matches.length;
    // For regex mode, pass the replacement string directly so $&, $1 etc.
    // expand. For plain mode, use a callback so $ stays literal.
    const newValue = useRegex
      ? ta.value.replace(re, replaceQuery)
      : ta.value.replace(re, () => replaceQuery);
    applyEdit(ta, newValue, ta.selectionStart, ta.selectionStart);
    toast(`${count} replacement${count !== 1 ? "s" : ""} made.`, "ok");
  }, [findQuery, replaceQuery, useRegex, caseSensitive, buildMatcher, findAllMatches, applyEdit, toast]);

  // ---------------------------------------------------------------------
  // Line manipulation: duplicate, move, comment, auto-indent, emmet
  // ---------------------------------------------------------------------

  const duplicateLine = useCallback(
    (ta: HTMLTextAreaElement) => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const value = ta.value;
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      let lineEnd = value.indexOf("\n", end);
      if (lineEnd === -1) lineEnd = value.length;
      else lineEnd++; // include the trailing newline
      const block = value.substring(lineStart, lineEnd);
      const newValue = value.substring(0, lineEnd) + block + value.substring(lineEnd);
      // Select the duplicated block
      applyEdit(ta, newValue, lineEnd, lineEnd + block.length - (block.endsWith("\n") ? 1 : 0));
    },
    [applyEdit],
  );

  const moveLine = useCallback(
    (ta: HTMLTextAreaElement, dir: -1 | 1) => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const value = ta.value;
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      let lineEnd = value.indexOf("\n", end);
      if (lineEnd === -1) lineEnd = value.length;
      else lineEnd++;
      const currentBlock = value.substring(lineStart, lineEnd);

      if (dir === -1) {
        if (lineStart === 0) return; // already at the top
        const prevStart = value.lastIndexOf("\n", lineStart - 2) + 1;
        const prevBlock = value.substring(prevStart, lineStart);
        const newValue =
          value.substring(0, prevStart) +
          currentBlock +
          prevBlock +
          value.substring(lineEnd);
        const newSelStart = prevStart;
        applyEdit(
          ta,
          newValue,
          newSelStart,
          newSelStart + currentBlock.length - (currentBlock.endsWith("\n") ? 1 : 0),
        );
      } else {
        if (lineEnd >= value.length) return; // already at the bottom
        const nextEndIdx = value.indexOf("\n", lineEnd);
        const nextEnd = nextEndIdx === -1 ? value.length : nextEndIdx + 1;
        const nextBlock = value.substring(lineEnd, nextEnd);
        const newValue =
          value.substring(0, lineStart) +
          nextBlock +
          currentBlock +
          value.substring(nextEnd);
        const newSelStart = lineStart + nextBlock.length;
        applyEdit(
          ta,
          newValue,
          newSelStart,
          newSelStart + currentBlock.length - (currentBlock.endsWith("\n") ? 1 : 0),
        );
      }
    },
    [applyEdit],
  );

  const toggleComment = useCallback(
    (ta: HTMLTextAreaElement) => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const value = ta.value;
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      let lineEnd = value.indexOf("\n", end);
      if (lineEnd === -1) lineEnd = value.length;
      else lineEnd++;
      const block = value.substring(lineStart, lineEnd);
      // Strip the trailing newline so we can operate on the lines themselves
      const trailingNl = block.endsWith("\n") ? "\n" : "";
      const body = trailingNl ? block.slice(0, -1) : block;
      const lines = body.split("\n");

      // Detect "all non-empty lines are wrapped in <!-- ... -->"
      const nonEmptyIdx = lines.map((l, i) => ({ l, i })).filter((x) => x.l.trim().length > 0);
      const allCommented =
        nonEmptyIdx.length > 0 &&
        nonEmptyIdx.every((x) => /^\s*<!--\s?(.*?)\s?-->\s*$/.test(x.l));

      let newLines: string[];
      if (allCommented) {
        // Uncomment each line
        newLines = lines.map((l) => {
          if (l.trim().length === 0) return l;
          const m = /^(\s*)<!--\s?(.*?)\s?-->(\s*)$/.exec(l);
          if (m) return m[1] + m[2] + m[3];
          return l.replace(/^(\s*)<!--\s?/, "").replace(/\s?-->(\s*)$/, "$1");
        });
      } else {
        // Comment each non-empty line
        newLines = lines.map((l) => {
          if (l.trim().length === 0) return l;
          const m = /^(\s*)(.*)$/.exec(l);
          if (m) return `${m[1]}<!-- ${m[2]} -->`;
          return `<!-- ${l} -->`;
        });
      }
      const newBody = newLines.join("\n");
      const newBlock = newBody + trailingNl;
      const newValue = value.substring(0, lineStart) + newBlock + value.substring(lineEnd);
      applyEdit(ta, newValue, lineStart, lineStart + newBody.length);
    },
    [applyEdit],
  );

  const handleAutoIndent = useCallback(
    (ta: HTMLTextAreaElement): boolean => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      if (start !== end) return false;

      const value = ta.value;
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const currentLine = value.substring(lineStart, start);
      const indentMatch = currentLine.match(/^[ \t]*/);
      const indent = indentMatch ? indentMatch[0] : "";

      const trimmedEnd = currentLine.replace(/\s+$/, "");
      const openMatch = /<([a-zA-Z][a-zA-Z0-9-]*)[^>]*>$/.exec(trimmedEnd);
      const isSelfClose = /\/>$/.test(trimmedEnd);
      const isCloseTag = /<\/[a-zA-Z][a-zA-Z0-9-]*>$/.test(trimmedEnd);

      let extra = "";
      if (
        openMatch &&
        !isSelfClose &&
        !isCloseTag &&
        !VOID_TAGS.has(openMatch[1].toLowerCase())
      ) {
        extra = INDENT;
      }

      // Detect a closing tag right after the cursor on the same line, e.g.
      // `<div>|</div>` — pressing Enter should put the closing tag on its own
      // line at the parent indent level.
      const rest = value.substring(start);
      const closeMatch = /^<\/([a-zA-Z][a-zA-Z0-9-]*)/.exec(rest);

      if (extra && closeMatch) {
        // <div>|</div>  →  <div>\n  |\n</div>
        const insert = "\n" + indent + extra;
        const tail = "\n" + indent;
        const newValue =
          value.substring(0, start) + insert + tail + value.substring(end);
        applyEdit(ta, newValue, start + insert.length, start + insert.length);
        return true;
      }

      const insert = "\n" + indent + extra;
      const newValue = value.substring(0, start) + insert + value.substring(end);
      applyEdit(ta, newValue, start + insert.length, start + insert.length);
      return true;
    },
    [applyEdit],
  );

  const tryEmmet = useCallback(
    (ta: HTMLTextAreaElement): boolean => {
      const value = ta.value;
      const cursor = ta.selectionStart;
      if (cursor !== ta.selectionEnd) return false;
      // Find the start of the line and the column of the cursor
      const lineStart = value.lastIndexOf("\n", cursor - 1) + 1;
      const lineUpToCursor = value.substring(lineStart, cursor);
      const detected = detectAbbreviation(lineUpToCursor, lineUpToCursor.length);
      if (!detected) return false;
      const expanded = expandAbbreviation(detected.abbr);
      if (expanded === null) return false;

      // Preserve the leading indentation of the current line
      const indentMatch = lineUpToCursor.match(/^[ \t]*/);
      const baseIndent = indentMatch ? indentMatch[0] : "";
      // Indent every line of the expansion by baseIndent (except the first,
      // which already sits at the cursor's indent level).
      const expandedLines = expanded.split("\n");
      const indented =
        expandedLines[0] +
        (expandedLines.length > 1
          ? "\n" + expandedLines.slice(1).map((l) => (l ? baseIndent + l : l)).join("\n")
          : "");

      const newValue =
        value.substring(0, lineStart + detected.start) +
        indented +
        value.substring(cursor);
      const newCursor = lineStart + detected.start + indented.length;
      applyEdit(ta, newValue, newCursor, newCursor);
      return true;
    },
    [applyEdit],
  );

  const insertSpaces = useCallback(
    (ta: HTMLTextAreaElement, count: number) => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const spaces = " ".repeat(count);
      const newValue = ta.value.substring(0, start) + spaces + ta.value.substring(end);
      applyEdit(ta, newValue, start + count, start + count);
    },
    [applyEdit],
  );

  const outdent = useCallback(
    (ta: HTMLTextAreaElement) => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const value = ta.value;
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const lineEndIdx = value.indexOf("\n", end);
      const lineEnd = lineEndIdx === -1 ? value.length : lineEndIdx;
      const block = value.substring(lineStart, lineEnd);
      const lines = block.split("\n");

      let removedBeforeCursor = 0;
      let totalRemoved = 0;
      let pos = lineStart;
      const newLines = lines.map((l) => {
        let removed = 0;
        if (l.startsWith("  ")) {
          removed = 2;
          l = l.slice(2);
        } else if (l.startsWith(" ") || l.startsWith("\t")) {
          removed = 1;
          l = l.slice(1);
        }
        const lineEndPos = pos + l.length + removed;
        // If the cursor is on this line and within the removed prefix, count
        // how many chars were removed to its left so we can adjust it.
        if (start >= pos && start <= lineEndPos) {
          const cursorOnLine = start - pos;
          removedBeforeCursor = Math.max(0, Math.min(removed, cursorOnLine));
        }
        pos = lineEndPos + 1; // +1 for the newline
        totalRemoved += removed;
        return l;
      });
      const newBlock = newLines.join("\n");
      const newValue = value.substring(0, lineStart) + newBlock + value.substring(lineEnd);
      applyEdit(
        ta,
        newValue,
        Math.max(lineStart, start - removedBeforeCursor),
        Math.max(0, end - totalRemoved),
      );
    },
    [applyEdit],
  );

  // ---------------------------------------------------------------------
  // jumpToLine (called by preview clicks / section nav)
  // ---------------------------------------------------------------------

  const jumpToLine = useCallback(
    (line: number) => {
      const ta = textareaRef.current;
      if (!ta || line < 0) return;
      suppressSyncRef.current = true;
      const lines = ta.value.split("\n");
      let offset = 0;
      for (let i = 0; i < line && i < lines.length; i++) {
        offset += lines[i].length + 1;
      }
      ta.focus();
      ta.setSelectionRange(offset, offset + (lines[line]?.length ?? 0));
      ta.scrollTop = Math.max(0, line * lineHeight - ta.clientHeight / 3);
      ta.classList.add("forge-flash");
      setTimeout(() => ta.classList.remove("forge-flash"), 1200);
      setTimeout(() => {
        suppressSyncRef.current = false;
      }, 400);
    },
    [lineHeight],
  );

  useEffect(() => {
    (window as unknown as { __forgeJump?: (l: number) => void }).__forgeJump = jumpToLine;
  }, [jumpToLine]);

  // ---------------------------------------------------------------------
  // __forgeInsertText: programmatic insert-at-cursor hook
  // Used by the color picker, emoji picker, paste-from-clipboard, and image
  // drag-drop to drop text into the editor at the current cursor position
  // without needing a direct ref. Behaves like the user typed it: updates the
  // store, restores the caret just after the inserted text, and flashes the
  // editor so the user can see where it landed.
  //
  // Implementation lives in `insertTextAtCursor` further down (defined with
  // the other drag-drop helpers) and is exposed globally via useEffect. This
  // used to be a second registration here — it has been consolidated to avoid
  // a stale-closure race where the older, simpler registration would shadow
  // the more comprehensive one.
  // ---------------------------------------------------------------------

  // ---------------------------------------------------------------------
  // Sync scroll: cursor movement → preview scroll
  // ---------------------------------------------------------------------

  const handleSelect = useCallback(() => {
    if (!syncOn || syncLockRef.current || suppressSyncRef.current) return;
    const ta = textareaRef.current;
    if (!ta) return;
    syncLockRef.current = true;
    setTimeout(() => {
      try {
        const pos = ta.selectionStart;
        const text = ta.value.substring(0, pos);
        const line = text.split("\n").length - 1;
        const jl = getJumpList(useForge.getState().html);
        let target = 0;
        for (let b = 0; b < jl.length; b++) {
          if (jl[b].line <= line) target = b;
          else break;
        }
        const iframe = document.getElementById("forge-preview") as HTMLIFrameElement | null;
        if (iframe?.contentDocument?.body) {
          const sections = iframe.contentDocument.querySelectorAll("[data-forge-idx]");
          if (sections[target]) {
            (sections[target] as HTMLElement).scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      } catch {
        // ignore
      }
      syncLockRef.current = false;
    }, 150);
  }, [syncOn]);

  // ---------------------------------------------------------------------
  // Minimap rendering (debounced 50ms)
  // ---------------------------------------------------------------------

  const renderMinimap = useCallback(() => {
    if (minimapTimerRef.current !== null) {
      clearTimeout(minimapTimerRef.current);
    }
    minimapTimerRef.current = setTimeout(() => {
      const canvas = minimapRef.current;
      const ta = textareaRef.current;
      if (!canvas || !ta) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cssW = MINIMAP_WIDTH;
      const cssH = canvas.clientHeight;
      if (cssH === 0) return;
      const dpr = window.devicePixelRatio || 1;
      // (Re)size the backing store for crisp rendering at the current DPR
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const lines = ta.value.split("\n");
      const totalLines = Math.max(1, lines.length);
      const lineH = cssH / totalLines;

      // Cap the maximum bar length using a reasonable assumption about typical
      // line widths so a single very long line doesn't flatten everything else.
      let maxLen = 1;
      for (const l of lines) {
        if (l.length > maxLen) maxLen = l.length;
      }
      // Soft cap at 120 chars for normalization
      const cap = Math.max(40, Math.min(160, maxLen));

      const barMaxW = cssW - 6;
      for (let i = 0; i < lines.length; i++) {
        const y = i * lineH;
        const w = Math.max(1, (Math.min(lines[i].length, cap) / cap) * barMaxW);
        // Colour: dim purple for code, slightly brighter for non-empty lines
        const nonEmpty = lines[i].trim().length > 0;
        ctx.fillStyle = nonEmpty
          ? "rgba(150, 120, 200, 0.55)"
          : "rgba(120, 100, 160, 0.25)";
        ctx.fillRect(3, y, w, Math.max(0.6, lineH - 0.4));
      }

      // Viewport indicator
      const viewRatio = ta.scrollHeight > ta.clientHeight
        ? ta.scrollTop / (ta.scrollHeight - ta.clientHeight)
        : 0;
      const viewportH = (ta.clientHeight / ta.scrollHeight) * cssH;
      const viewportY = viewRatio * (cssH - viewportH);
      ctx.fillStyle = "rgba(196, 160, 228, 0.18)";
      ctx.fillRect(0, viewportY, cssW, viewportH);
      ctx.strokeStyle = "rgba(196, 160, 228, 0.45)";
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, viewportY + 0.5, cssW - 1, viewportH - 1);
    }, 50);
  }, []);

  useEffect(() => {
    renderMinimap();
  }, [htmlContent, fontSize, renderMinimap]);

  // ---------------------------------------------------------------------
  // Scroll sync: textarea → gutter translate + minimap viewport
  // ---------------------------------------------------------------------

  const handleScroll = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    if (gutterInnerRef.current) {
      gutterInnerRef.current.style.transform = `translateY(${-ta.scrollTop}px)`;
    }
    renderMinimap();
  }, [renderMinimap]);

  const handleMinimapClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = minimapRef.current;
      const ta = textareaRef.current;
      if (!canvas || !ta) return;
      const rect = canvas.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const ratio = rect.height > 0 ? y / rect.height : 0;
      const targetTop = ratio * (ta.scrollHeight - ta.clientHeight) - ta.clientHeight / 2;
      ta.scrollTop = Math.max(0, Math.min(ta.scrollHeight - ta.clientHeight, targetTop));
      ta.focus();
    },
    [],
  );

  // ---------------------------------------------------------------------
  // Line count tracking moved to a render-time useMemo above (see lineCount).
  // ---------------------------------------------------------------------

  // ---------------------------------------------------------------------
  // Redraw minimap when the host resizes
  // ---------------------------------------------------------------------

  useEffect(() => {
    const host = textareaRef.current?.parentElement;
    if (!host) return;
    const ro = new ResizeObserver(() => {
      renderMinimap();
    });
    ro.observe(host);
    return () => ro.disconnect();
  }, [renderMinimap]);

  // ---------------------------------------------------------------------
  // Keyboard shortcuts
  // ---------------------------------------------------------------------

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const ta = e.currentTarget;
      const mod = e.ctrlKey || e.metaKey;
      const key = e.key;

      // Find & Replace: Ctrl+H
      if (mod && !e.shiftKey && !e.altKey && key.toLowerCase() === "h") {
        e.preventDefault();
        setFindReplaceOpen(true);
        return;
      }

      // Go to Line: Ctrl+G
      if (mod && !e.shiftKey && !e.altKey && key.toLowerCase() === "g") {
        e.preventDefault();
        const input = window.prompt("Go to line number:");
        if (input !== null) {
          const n = parseInt(input.trim(), 10);
          if (Number.isFinite(n) && n > 0) {
            jumpToLine(n - 1);
          } else if (input.trim() !== "") {
            toast("Invalid line number.", "error");
          }
        }
        return;
      }

      // Duplicate line: Ctrl+Shift+D
      if (mod && e.shiftKey && !e.altKey && key.toLowerCase() === "d") {
        e.preventDefault();
        duplicateLine(ta);
        return;
      }

      // Move line up/down: Alt+ArrowUp / Alt+ArrowDown
      if (e.altKey && !mod && (key === "ArrowUp" || key === "ArrowDown")) {
        e.preventDefault();
        moveLine(ta, key === "ArrowUp" ? -1 : 1);
        return;
      }

      // Comment toggle: Ctrl+/
      if (mod && !e.shiftKey && !e.altKey && key === "/") {
        e.preventDefault();
        toggleComment(ta);
        return;
      }

      // Font size: Ctrl+= (increase), Ctrl+- (decrease), Ctrl+0 (reset)
      if (mod && !e.shiftKey && !e.altKey && (key === "=" || key === "+")) {
        e.preventDefault();
        setFontSize(Math.min(MAX_FONT, fontSize + 1));
        return;
      }
      if (mod && !e.shiftKey && !e.altKey && key === "-") {
        e.preventDefault();
        setFontSize(Math.max(MIN_FONT, fontSize - 1));
        return;
      }
      if (mod && !e.shiftKey && !e.altKey && key === "0") {
        e.preventDefault();
        setFontSize(DEFAULT_FONT_SIZE);
        return;
      }

      // Tab: try Emmet first, fall back to 2 spaces. Shift+Tab outdents.
      if (key === "Tab") {
        if (e.shiftKey) {
          e.preventDefault();
          outdent(ta);
          return;
        }
        e.preventDefault();
        if (!tryEmmet(ta)) {
          insertSpaces(ta, 2);
        }
        return;
      }

      // Enter: auto-indent
      if (key === "Enter" && !e.shiftKey && !mod) {
        if (handleAutoIndent(ta)) {
          e.preventDefault();
          return;
        }
      }
    },
    [
      fontSize,
      setFontSize,
      setFindReplaceOpen,
      jumpToLine,
      duplicateLine,
      moveLine,
      toggleComment,
      tryEmmet,
      insertSpaces,
      outdent,
      handleAutoIndent,
      toast,
    ],
  );

  // Auto-focus the find input when the bar opens
  const findInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (findReplaceOpen) {
      requestAnimationFrame(() => findInputRef.current?.focus());
    }
  }, [findReplaceOpen]);

  // ---------------------------------------------------------------------
  // Drag-and-drop file import + global __forgeInsertText
  // ---------------------------------------------------------------------

  // When non-zero, an overlay should be shown indicating the user is dragging
  // a file over the editor. Tracked as a depth counter because dragenter/dragleave
  // fire on every child element transition.
  const dragDepthRef = useRef(0);
  const [dragOverlay, setDragOverlay] = useState<string | null>(null);

  /**
   * Insert text at the current cursor position (replacing any selection).
   * Exposed globally so other components (e.g. Toolbar's Paste-from-Clipboard
   * button, or image drag-drop) can insert text without needing a ref into
   * this component. Mirrors the `__forgeJump` pattern.
   */
  const insertTextAtCursor = useCallback(
    (text: string) => {
      const ta = textareaRef.current;
      if (!ta) {
        // Fallback: append to the store html
        setHtml(useForge.getState().html + text);
        return;
      }
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const value = ta.value;
      const newValue = value.substring(0, start) + text + value.substring(end);
      const newCursor = start + text.length;
      applyEdit(ta, newValue, newCursor, newCursor);
      ta.focus();
      // Briefly flash so the user sees where the insert landed.
      ta.classList.add("forge-flash");
      setTimeout(() => ta.classList.remove("forge-flash"), 1200);
    },
    [applyEdit, setHtml],
  );

  // Expose the insert function globally so Toolbar (and other code outside
  // this component) can call it.
  useEffect(() => {
    (window as unknown as { __forgeInsertText?: (text: string) => void }).__forgeInsertText =
      insertTextAtCursor;
    return () => {
      delete (window as unknown as { __forgeInsertText?: (text: string) => void }).__forgeInsertText;
    };
  }, [insertTextAtCursor]);

  const isAcceptableTextFile = (file: File) => {
    const name = file.name.toLowerCase();
    return (
      name.endsWith(".html") ||
      name.endsWith(".htm") ||
      name.endsWith(".txt") ||
      file.type === "text/html" ||
      file.type === "text/plain"
    );
  };
  const isImageFile = (file: File) =>
    file.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i.test(file.name);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    // preventDefault is required so the drop event fires.
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      // Show the copy cursor during the drag.
      e.dataTransfer.dropEffect = "copy";
    }
    if (dragDepthRef.current === 0) {
      dragDepthRef.current = 1;
      const first = e.dataTransfer?.items?.[0];
      const guessedName = first?.getAsFile()?.name ?? "file";
      setDragOverlay(guessedName || "file");
    }
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current += 1;
    const name = e.dataTransfer?.items?.[0]?.getAsFile()?.name ?? null;
    if (name) setDragOverlay(name);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) {
      setDragOverlay(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragDepthRef.current = 0;
      setDragOverlay(null);
      const files = Array.from(e.dataTransfer?.files ?? []);
      if (files.length === 0) return;
      const file = files[0];

      if (isImageFile(file)) {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = String(reader.result ?? "");
          if (!dataUrl) {
            toast("Failed to read image file.", "error");
            return;
          }
          const tag = `<img src="${dataUrl}" alt="${file.name.replace(/"/g, "")}" />`;
          insertTextAtCursor(tag);
          toast(`Inserted <img> for "${file.name}" (${(dataUrl.length / 1024).toFixed(1)} KB).`, "ok");
        };
        reader.onerror = () => toast("Failed to read image file.", "error");
        reader.readAsDataURL(file);
        return;
      }

      if (isAcceptableTextFile(file)) {
        const reader = new FileReader();
        reader.onload = () => {
          const text = String(reader.result ?? "");
          if (!text) {
            toast(`"${file.name}" is empty.`, "note");
            return;
          }
          setHtml(text);
          toast(`Loaded "${file.name}" (${text.length.toLocaleString()} chars).`, "ok");
        };
        reader.onerror = () => toast(`Failed to read "${file.name}".`, "error");
        reader.readAsText(file);
        return;
      }

      toast(`Unsupported file type: "${file.name}". Drop .html, .htm, .txt, or an image.`, "error");
    },
    [insertTextAtCursor, setHtml, toast],
  );

  // ---------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------

  const lineNumbers = useMemo(() => {
    const arr: number[] = [];
    for (let i = 1; i <= lineCount; i++) arr.push(i);
    return arr;
  }, [lineCount]);

  return (
    <div
      className="forge-textarea-host"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="forge-editor-toolbar">
        <button
          type="button"
          className={`forge-btn ghost compact ${showLineNumbers ? "on" : ""}`}
          onClick={toggleLineNumbers}
          title="Toggle line numbers"
          aria-pressed={showLineNumbers}
        >
          #
        </button>
        <span className="forge-font-size-label" title="Font size (Ctrl+= / Ctrl+- / Ctrl+0)">
          {fontSize}px
        </span>
        <button
          type="button"
          className="forge-btn ghost compact"
          onClick={() => setFontSize(Math.max(MIN_FONT, fontSize - 1))}
          title="Decrease font size (Ctrl+-)"
        >
          −
        </button>
        <button
          type="button"
          className="forge-btn ghost compact"
          onClick={() => setFontSize(DEFAULT_FONT_SIZE)}
          title="Reset font size (Ctrl+0)"
        >
          0
        </button>
        <button
          type="button"
          className="forge-btn ghost compact"
          onClick={() => setFontSize(Math.min(MAX_FONT, fontSize + 1))}
          title="Increase font size (Ctrl+=)"
        >
          +
        </button>
        <button
          type="button"
          className="forge-btn ghost compact"
          onClick={() => setFindReplaceOpen(true)}
          title="Find & Replace (Ctrl+H)"
        >
          Find
        </button>
        <span className="forge-toolbar-hint">
          Tab: Emmet · Ctrl+G: Go to line · Ctrl+/: Comment
        </span>
      </div>

      {findReplaceOpen && (
        <div className="forge-find-bar">
          <div className="forge-find-row">
            <input
              ref={findInputRef}
              className="forge-find-input"
              type="text"
              placeholder="Find…"
              value={findQuery}
              onChange={(e) => setFindQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  findNext();
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  setFindReplaceOpen(false);
                }
              }}
              aria-label="Find"
            />
            <span className="forge-find-info" title="Match count">
              {matchCount} match{matchCount !== 1 ? "es" : ""}
            </span>
            <button
              type="button"
              className={`forge-btn ghost compact ${useRegex ? "on" : ""}`}
              onClick={() => setUseRegex((v) => !v)}
              title="Use regex"
            >
              .*
            </button>
            <button
              type="button"
              className={`forge-btn ghost compact ${caseSensitive ? "on" : ""}`}
              onClick={() => setCaseSensitive((v) => !v)}
              title="Case sensitive"
            >
              Aa
            </button>
            <button
              type="button"
              className="forge-btn ghost compact"
              onClick={findNext}
              title="Find next (Enter)"
            >
              Next
            </button>
            <button
              type="button"
              className="forge-btn ghost compact"
              onClick={() => setFindReplaceOpen(false)}
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>
          <div className="forge-find-row">
            <input
              className="forge-find-input"
              type="text"
              placeholder="Replace with…"
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  setFindReplaceOpen(false);
                }
              }}
              aria-label="Replace with"
            />
            <button
              type="button"
              className="forge-btn ghost compact"
              onClick={replaceOne}
              title="Replace one"
            >
              Replace
            </button>
            <button
              type="button"
              className="forge-btn compact"
              onClick={replaceAll}
              title="Replace all"
            >
              Replace All
            </button>
          </div>
        </div>
      )}

      <div className="forge-editor-body">
        {showLineNumbers && (
          <div
            className="forge-line-gutter"
            aria-hidden="true"
            style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px` }}
          >
            <div className="forge-line-gutter-inner" ref={gutterInnerRef}>
              {lineNumbers.map((n) => (
                <div className="forge-line-num" key={n} style={{ height: lineHeight }}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        )}
        <textarea
          ref={textareaRef}
          className="forge-textarea"
          style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px` }}
          value={htmlContent}
          onChange={(e) => setHtml(e.target.value)}
          onSelect={handleSelect}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          wrap={lineWrap ? "soft" : "off"}
          placeholder="Paste your HTML bio here…"
          aria-label="HTML source editor"
        />
        <canvas
          ref={minimapRef}
          className="forge-minimap"
          style={{ width: MINIMAP_WIDTH, height: "100%" }}
          onClick={handleMinimapClick}
          aria-hidden="true"
        />
      </div>

      {diffLines.length > 0 && <DiffIndicator count={diffLines.length} />}
      {dragOverlay && <DragOverlay filename={dragOverlay} />}
    </div>
  );
}

function DragOverlay({ filename }: { filename: string }) {
  return (
    <div className="forge-drop-overlay" role="status" aria-live="polite">
      <div className="forge-drop-overlay-inner">
        <div className="forge-drop-overlay-icon">⤓</div>
        <div className="forge-drop-overlay-text">
          Drop to load <b>{filename}</b>
        </div>
        <div className="forge-drop-overlay-hint">
          .html / .htm / .txt replaces editor · images insert an &lt;img&gt; tag
        </div>
      </div>
    </div>
  );
}

function DiffIndicator({ count }: { count: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 8,
        right: 8,
        background: "rgba(140, 200, 140, 0.18)",
        border: "1px solid var(--forge-ok)",
        color: "var(--forge-ok)",
        borderRadius: 4,
        padding: "2px 8px",
        fontSize: 10,
        fontFamily: "Consolas, monospace",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {count} diff line{count !== 1 ? "s" : ""}
    </div>
  );
}
