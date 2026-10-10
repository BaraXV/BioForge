"use client";

import { useForge } from "@/store/forge/useForge";
import { getJumpList } from "@/lib/forge/blockMapper";
import { useMemo } from "react";

export default function SectionNavigator() {
  const htmlContent = useForge((s) => s.html);

  const sections = useMemo(() => getJumpList(htmlContent), [htmlContent]);

  const handleClick = (line: number) => {
    const jumper = (window as unknown as { __forgeJump?: (l: number) => void }).__forgeJump;
    jumper?.(line);
  };

  if (sections.length === 0) {
    return (
      <div className="forge-section-nav">
        <div style={{ color: "var(--forge-dim)", fontSize: 11, padding: 8 }}>
          No sections detected. Paste HTML to see the jump list.
        </div>
      </div>
    );
  }

  return (
    <div className="forge-section-nav">
      {sections.map((s, i) => (
        <button
          key={`${i}-${s.line}`}
          className="forge-section-item"
          onClick={() => handleClick(s.line)}
          title={`Jump to line ${s.line + 1}`}
          type="button"
        >
          <span className="num">{i}</span>
          <span className="tag">&lt;{s.tag}&gt;</span>
          <span className="line">L{s.line + 1}</span>
        </button>
      ))}
    </div>
  );
}
