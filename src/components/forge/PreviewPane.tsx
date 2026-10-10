"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useForge } from "@/store/forge/useForge";
import { sanitize } from "@/lib/forge/sanitizer";
import { getJumpList } from "@/lib/forge/blockMapper";

const PREVIEW_SHELL = `<!DOCTYPE html><html><head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Dancing+Script:wght@400;700&family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Jura:wght@300;400;500;600;700&family=Lexend:wght@300;400;600;700&family=Monoton&family=Poppins:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Press+Start+2P&family=Rock+Salt&family=VT323&display=swap">
<style>html,body{background:#141018 !important;color:#e7e2ee !important;overflow-x:hidden !important;margin:0;padding:0;}
img{max-width:100% !important;height:auto !important;}
[data-forge-idx]{scroll-margin-top:12px;}</style>
</head><body></body></html>`;

export default function PreviewPane() {
  const htmlContent = useForge((s) => s.html);
  const previewKey = useForge((s) => s.previewKey);
  const setPreviewState = useForge((s) => s.setPreviewState);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const renderTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wiredRef = useRef(false);
  const [sectionStat, setSectionStat] = useState("– sections");

  const previewSections = useCallback(
    (doc: Document): Element[] => {
      const kids = doc.body.children;
      if (kids.length === 1) {
        const arr: Element[] = [kids[0]];
        const inner = kids[0].children;
        if (
          inner.length === 1 &&
          inner[0].tagName === "DIV" &&
          inner[0].children.length > 0
        ) {
          const level2 = inner[0].children;
          for (let c = 0; c < level2.length; c++) arr.push(level2[c]);
        } else {
          for (let q = 0; q < inner.length; q++) arr.push(inner[q]);
        }
        return arr;
      }
      const out: Element[] = [];
      for (let w = 0; w < kids.length; w++) out.push(kids[w]);
      return out;
    },
    [],
  );

  const wireClicks = useCallback(
    (doc: Document) => {
      if (wiredRef.current) return;
      try {
        doc.addEventListener("click", (e: MouseEvent) => {
          let node = e.target as Node | null;
          while (node && node !== doc.body) {
            const el = node as Element;
            const idx = el.getAttribute?.("data-forge-idx");
            if (idx !== null && idx !== undefined && idx !== "") {
              const jumper = (
                window as unknown as { __forgeJump?: (l: number) => void }
              ).__forgeJump;
              jumper?.(parseInt(idx, 10));
              (el as HTMLElement).style.outline =
                "2px solid rgba(235,130,90,0.85)";
              setTimeout(() => {
                (el as HTMLElement).style.outline = "";
              }, 900);
              e.preventDefault();
              return;
            }
            node = node.parentElement;
          }
        });
        (doc as unknown as { __forgeWired?: boolean }).__forgeWired = true;
        wiredRef.current = true;
      } catch {
        // ignore
      }
    },
    [],
  );

  const injectSectionIndices = useCallback(
    (doc: Document) => {
      const jl = getJumpList(useForge.getState().html);
      const sections = previewSections(doc);
      let labeled = 0;
      for (let s = 0; s < sections.length && s < jl.length; s++) {
        sections[s].setAttribute("data-forge-idx", String(s));
        labeled++;
      }
      return { labeled, total: jl.length };
    },
    [previewSections],
  );

  const renderPreview = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc || !doc.body) return;

    // Preserve scroll
    let sy = 0;
    try {
      sy =
        iframe.contentWindow?.pageYOffset ||
        doc.documentElement.scrollTop ||
        doc.body.scrollTop ||
        0;
    } catch {
      // ignore
    }

    doc.body.innerHTML = sanitize(useForge.getState().html);
    const { labeled, total } = injectSectionIndices(doc);
    wireClicks(doc);

    // Restore scroll
    try {
      iframe.contentWindow?.scrollTo(0, sy);
      doc.documentElement.scrollTop = sy;
      doc.body.scrollTop = sy;
    } catch {
      // ignore
    }
    iframe.contentWindow?.requestAnimationFrame?.(() => {
      try {
        iframe.contentWindow?.scrollTo(0, sy);
      } catch {
        // ignore
      }
    });

    setSectionStat(`${labeled} / ${total} sections`);
    setPreviewState({
      labeled,
      wired: wiredRef.current,
      accessible: true,
    });
  }, [injectSectionIndices, wireClicks, setPreviewState]);

  // Debounced render on html change
  useEffect(() => {
    if (renderTimer.current) clearTimeout(renderTimer.current);
    renderTimer.current = setTimeout(renderPreview, 300);
    return () => {
      if (renderTimer.current) clearTimeout(renderTimer.current);
    };
  }, [htmlContent, renderPreview]);

  // Full refresh on previewKey change (rebuild the shell)
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    wiredRef.current = false;
    iframe.onload = () => {
      renderPreview();
    };
    iframe.srcdoc = PREVIEW_SHELL;
  }, [previewKey, renderPreview]);

  return (
    <iframe
      ref={iframeRef}
      id="forge-preview"
      className="forge-preview"
      title="Live preview"
      sandbox="allow-same-origin"
      srcDoc={PREVIEW_SHELL}
    />
  );
}
