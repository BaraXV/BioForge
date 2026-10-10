"use client";

import { useRef, useEffect, useCallback } from "react";
import { useForge } from "@/store/forge/useForge";
import { getJumpList } from "@/lib/forge/blockMapper";

interface CodeEditorProps {
  onJumpRequest?: (line: number) => void;
}

export default function CodeEditor({ onJumpRequest }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const syncLockRef = useRef(false);
  const suppressSyncRef = useRef(false);

  const htmlContent = useForge((s) => s.html);
  const setHtml = useForge((s) => s.setHtml);
  const syncOn = useForge((s) => s.syncOn);
  const diffLines = useForge((s) => s.diffLines);
  const lineWrap = useForge((s) => s.lineWrap);

  // Jump to a specific line (called by preview clicks / section nav)
  const jumpToLine = useCallback((line: number) => {
    const ta = textareaRef.current;
    if (!ta || line < 0) return;
    suppressSyncRef.current = true;

    // Compute the character offset for the start of the target line
    const lines = ta.value.split("\n");
    let offset = 0;
    for (let i = 0; i < line && i < lines.length; i++) {
      offset += lines[i].length + 1; // +1 for the newline
    }

    // Select the line and scroll it into view
    ta.focus();
    ta.setSelectionRange(offset, offset + (lines[line]?.length ?? 0));

    // Approximate scroll: count lines above and multiply by line height
    const lineHeight = 19; // matches CSS line-height: 1.5 * 13px
    ta.scrollTop = Math.max(0, line * lineHeight - ta.clientHeight / 3);

    // Brief flash effect via a CSS class toggle
    ta.classList.add("forge-flash");
    setTimeout(() => ta.classList.remove("forge-flash"), 1200);

    setTimeout(() => {
      suppressSyncRef.current = false;
    }, 400);
  }, []);

  // Expose jumpToLine on window for preview/section-nav to call
  useEffect(() => {
    (window as unknown as { __forgeJump?: (l: number) => void }).__forgeJump = jumpToLine;
    onJumpRequest?.(-1);
  }, [jumpToLine, onJumpRequest]);

  // Sync scroll: cursor movement -> scroll preview to matching section
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

  // Tab key inserts two spaces instead of changing focus
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = e.currentTarget;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newValue =
          ta.value.substring(0, start) + "  " + ta.value.substring(end);
        setHtml(newValue);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 2;
        });
      }
    },
    [setHtml],
  );

  return (
    <div className="forge-textarea-host">
      <textarea
        ref={textareaRef}
        className="forge-textarea"
        value={htmlContent}
        onChange={(e) => setHtml(e.target.value)}
        onSelect={handleSelect}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        wrap={lineWrap ? "soft" : "off"}
        placeholder="Paste your HTML bio here…"
        aria-label="HTML source editor"
      />
      {diffLines.length > 0 && (
        <DiffIndicator count={diffLines.length} />
      )}
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
