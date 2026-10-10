"use client";

import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import {
  Smartphone,
  Tablet,
  Monitor,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  Camera,
  MousePointer2,
} from "lucide-react";
import { useForge } from "@/store/forge/useForge";
import { sanitize } from "@/lib/forge/sanitizer";
import { getJumpList } from "@/lib/forge/blockMapper";

/**
 * Build the preview iframe shell. The base set of fonts is always included so
 * pasting foreign bios still renders nicely; any user-loaded custom fonts are
 * appended to the same Google Fonts URL so they're available in the preview
 * the moment the user applies them (see FontLoaderDialog).
 */
function buildShell(customFonts: string[]): string {
  // Base Google Fonts families that ship with the forge preview shell.
  const baseFamilies = [
    "Berkshire+Swash",
    "Crimson+Text:ital,wght@0,400;0,600;0,700;1,400",
    "Dancing+Script:wght@400;700",
    "Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400",
    "Inter:wght@400;500;600;700",
    "JetBrains+Mono:wght@400;500;600;700",
    "Jura:wght@300;400;500;600;700",
    "Lexend:wght@300;400;600;700",
    "Monoton",
    "Poppins:ital,wght@0,300;0,400;0,600;0,700;1,400",
    "Press+Start+2P",
    "Rock+Salt",
    "VT323",
  ];
  // User-supplied fonts: collapse internal whitespace, encode as family=… pairs.
  const userFamilies = customFonts
    .map((f) => "family=" + f.trim().replace(/\s+/g, "+"))
    .filter((s) => s.length > "family=".length);
  // De-dupe user families against the base set so we don't ask Google twice.
  const baseLower = new Set(baseFamilies.map((f) => f.toLowerCase()));
  const uniqueUser = userFamilies.filter(
    (f) => !baseLower.has(f.toLowerCase()),
  );
  const allFamilies = [...baseFamilies, ...uniqueUser];
  const href =
    "https://fonts.googleapis.com/css2?" +
    allFamilies.join("&") +
    "&display=swap";
  return `<!DOCTYPE html><html><head>
<link rel="stylesheet" href="${href}">
<style>html,body{background:#141018 !important;color:#e7e2ee !important;overflow-x:hidden !important;margin:0;padding:0;}
img{max-width:100% !important;height:auto !important;}
[data-forge-idx]{scroll-margin-top:12px;}</style>
</head><body></body></html>`;
}

/** Tooltip element id (stable across re-renders) injected into the iframe body. */
const INSPECTOR_TIP_ID = "forge-inspector-tooltip";
/** Attribute marker on the element currently outlined by the inspector. */
const INSPECTOR_HIGHLIGHT_ATTR = "data-forge-inspect-hl";

/**
 * Escape a string for safe insertion into HTML (text content or attribute value
 * inside double quotes). Used by the inspector tooltip builder so a hostile
 * class name / id / inline-style can't break the tooltip's HTML structure or
 * inject markup. The iframe is sandboxed without allow-scripts so script
 * execution is already impossible, but escaping prevents the tooltip from
 * rendering garbled output when the inspected element has unusual attributes.
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Inline style string for the inspector tooltip — kept here so we can re-inject
 *  after the iframe body innerHTML is replaced on every render. */
const INSPECTOR_TIP_CSS = [
  "position:fixed",
  "pointer-events:none",
  "background:rgba(16,14,20,0.96)",
  "color:#e7e2ee",
  "border:1px solid rgb(58,50,80)",
  "border-radius:5px",
  "padding:6px 9px",
  "font-size:11px",
  "font-family:Consolas,monospace",
  "z-index:2147483647",
  "max-width:280px",
  "word-break:break-word",
  "box-shadow:0 6px 20px rgba(0,0,0,0.6)",
  "line-height:1.5",
  "display:none",
  "white-space:normal",
].join(";");

/** Format today's date as YYYY-MM-DD for filename suffixes. */
function dateStamp(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Trigger a browser download for the given Blob with the given filename. */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoke on the next tick so the click has a chance to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function PreviewPane() {
  const htmlContent = useForge((s) => s.html);
  const previewKey = useForge((s) => s.previewKey);
  const setPreviewState = useForge((s) => s.setPreviewState);
  const deviceMode = useForge((s) => s.previewDeviceMode);
  const setDeviceMode = useForge((s) => s.setPreviewDeviceMode);
  const zoom = useForge((s) => s.previewZoom);
  const setZoom = useForge((s) => s.setPreviewZoom);
  const inspector = useForge((s) => s.previewInspector);
  const toggleInspector = useForge((s) => s.togglePreviewInspector);
  const customFonts = useForge((s) => s.customFonts);
  const toast = useForge((s) => s.toast);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const renderTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wiredRef = useRef(false);
  /** Live mirror of the inspector flag so the document-level mousemove handler
   *  (wired once) can read the current value without re-binding. */
  const inspectorOnRef = useRef(inspector);
  const [sectionStat, setSectionStat] = useState("– sections");

  // Memoize the preview shell so it only rebuilds when the custom-fonts list
  // changes (not on every render). The iframe's srcDoc depends on this string,
  // so a new shell identity triggers a full iframe reload (see effect below).
  const shell = useMemo(() => buildShell(customFonts), [customFonts]);

  // Keep inspectorOnRef in sync with the inspector state. The ref is read by
  // the mousemove handler wired once into the iframe document; updating the
  // ref in an effect (rather than during render) is the React-recommended
  // pattern and satisfies the react-hooks/refs lint rule.
  useEffect(() => {
    inspectorOnRef.current = inspector;
  }, [inspector]);

  // ---------------------------------------------------------------------
  // Section enumeration (unchanged from original)
  // ---------------------------------------------------------------------

  const previewSections = useCallback((doc: Document): Element[] => {
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
  }, []);

  // ---------------------------------------------------------------------
  // Click + inspector wiring (called once per iframe load)
  // ---------------------------------------------------------------------

  const wireClicks = useCallback((doc: Document) => {
    if (wiredRef.current) return;
    try {
      // Inject a one-shot <style> rule that gives the body a crosshair
      // cursor when the inspector is active. The rule is keyed off the
      // data-forge-inspector body attribute (toggled elsewhere). This
      // avoids writing directly to body.style.cursor, which trips the
      // react-hooks/immutability lint rule via the iframe ref chain.
      const styleId = "forge-inspector-style";
      if (!doc.getElementById(styleId)) {
        const s = doc.createElement("style");
        s.id = styleId;
        s.textContent =
          "body[data-forge-inspector=\"1\"], body[data-forge-inspector=\"1\"] *{cursor:crosshair !important;}";
        doc.head.appendChild(s);
      }
      // --- Click → jump to source line ---
      // Walks up from the click target to the nearest [data-forge-idx]
      // ancestor and calls the global __forgeJump(line) handler. In both
      // inspector-on and inspector-off modes this is the same behaviour:
      // clicking a section (or any descendant of one) jumps to its source.
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

      // --- Inspector: mousemove → show tooltip + outline hovered element ---
      // Wired once; reads inspectorOnRef.current so toggling the flag in the
      // parent component takes effect immediately without re-binding.
      doc.addEventListener("mousemove", (e: MouseEvent) => {
        if (!inspectorOnRef.current) {
          const tip = doc.getElementById(INSPECTOR_TIP_ID);
          if (tip && tip.style.display !== "none") tip.style.display = "none";
          const prev = doc.querySelectorAll(
            `[${INSPECTOR_HIGHLIGHT_ATTR}]`,
          );
          prev.forEach((el) => {
            (el as HTMLElement).style.outline = "";
            el.removeAttribute(INSPECTOR_HIGHLIGHT_ATTR);
          });
          return;
        }
        const target = e.target as Element | null;
        if (
          !target ||
          target === doc.body ||
          target === doc.documentElement ||
          target.id === INSPECTOR_TIP_ID
        ) {
          return;
        }
        const tag = target.tagName.toLowerCase();
        const idAttr = target.id ? `#${escapeHtml(target.id)}` : "";
        const clsStr =
          target.className && typeof target.className === "string"
            ? target.className
                .split(/\s+/)
                .filter(Boolean)
                .map((c) => `.${escapeHtml(c)}`)
                .join("")
            : "";
        const inlineStyle = target.getAttribute("style") || "";

        // Walk up to the nearest section to surface its index, so clicking
        // any inner element (in inspector mode) still targets a section.
        let n: Element | null = target;
        let sectionIdx = "";
        while (n && n !== doc.body) {
          const i = n.getAttribute?.("data-forge-idx");
          if (i !== null && i !== undefined && i !== "") {
            sectionIdx = i;
            break;
          }
          n = n.parentElement;
        }

        let html = `<b style="color:#c4a0e4">${escapeHtml(tag)}</b>${idAttr}${clsStr}`;
        if (inlineStyle) {
          const short =
            inlineStyle.length > 80
              ? inlineStyle.slice(0, 80) + "…"
              : inlineStyle;
          html += `<br><span style="color:#9691a0;font-size:10px">style: ${escapeHtml(short)}</span>`;
        }
        if (sectionIdx) {
          html +=
            '<br><span style="color:#d4af55;font-size:10px">section #' +
            escapeHtml(sectionIdx) +
            " — click to jump ⇗</span>";
        }

        let tip = doc.getElementById(INSPECTOR_TIP_ID);
        if (!tip) {
          tip = doc.createElement("div");
          tip.id = INSPECTOR_TIP_ID;
          tip.style.cssText = INSPECTOR_TIP_CSS;
          doc.body.appendChild(tip);
        }
        tip.innerHTML = html;
        tip.style.display = "block";

        const vw = iframeRef.current?.contentWindow?.innerWidth ?? 800;
        const vh = iframeRef.current?.contentWindow?.innerHeight ?? 600;
        const tipW = tip.offsetWidth || 240;
        const tipH = tip.offsetHeight || 60;
        const x = Math.min(e.clientX + 14, vw - tipW - 8);
        const y = Math.min(e.clientY + 14, vh - tipH - 8);
        tip.style.left = Math.max(4, x) + "px";
        tip.style.top = Math.max(4, y) + "px";

        // Outline the hovered element. Clear any previously highlighted one.
        const prev = doc.querySelectorAll(`[${INSPECTOR_HIGHLIGHT_ATTR}]`);
        prev.forEach((el) => {
          (el as HTMLElement).style.outline = "";
          el.removeAttribute(INSPECTOR_HIGHLIGHT_ATTR);
        });
        (target as HTMLElement).style.outline =
          "2px solid rgba(120, 90, 180, 0.85)";
        target.setAttribute(INSPECTOR_HIGHLIGHT_ATTR, "1");
      });

      // Hide the tooltip when the cursor leaves the iframe document.
      doc.addEventListener("mouseleave", () => {
        const tip = doc.getElementById(INSPECTOR_TIP_ID);
        if (tip) tip.style.display = "none";
      });

      (doc as unknown as { __forgeWired?: boolean }).__forgeWired = true;
      wiredRef.current = true;
    } catch {
      // ignore — wiring is best-effort
    }
  }, []);

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

    // Re-apply the inspector marker on the (now-wiped) body so the cursor
    // CSS rule (injected once by wireClicks) keeps applying. The tooltip
    // element is lazy-recreated by the mousemove handler on the next hover.
    if (inspectorOnRef.current) {
      doc.body.setAttribute("data-forge-inspector", "1");
    } else {
      doc.body.removeAttribute("data-forge-inspector");
    }

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

  // Full refresh on previewKey change OR when the shell string changes
  // (e.g. custom fonts were added/removed). Rebuilding srcDoc forces the
  // iframe to reload with the new <link> tag, which is what makes newly
  // applied fonts actually show up in the preview.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let cancelled = false;
    wiredRef.current = false;
    const handleLoad = () => {
      if (cancelled) return;
      renderPreview();
    };
    iframe.addEventListener("load", handleLoad);
    iframe.srcdoc = shell;
    return () => {
      cancelled = true;
      // removeEventListener is safe even if the listener was never registered.
      iframe.removeEventListener("load", handleLoad);
    };
  }, [previewKey, renderPreview, shell]);

  // When inspector toggles, sync the attribute on the live doc so the
  // change is visible immediately (no need to wait for the next html change).
  // We mutate body attributes only (not body.style) — directly writing to
  // body.style.cursor trips the react-hooks/immutability lint rule because
  // it tracks the chain back to the iframe ref. The cursor styling itself
  // is handled by a CSS rule injected in wireClicks() keyed off the
  // data-forge-inspector attribute we toggle here.
  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!doc || !doc.body) return;
    if (inspector) {
      doc.body.setAttribute("data-forge-inspector", "1");
    } else {
      doc.body.removeAttribute("data-forge-inspector");
      // Hide any visible tooltip + clear outline when turning off.
      const tip = doc.getElementById(INSPECTOR_TIP_ID);
      if (tip) tip.style.display = "none";
      const prev = doc.querySelectorAll(`[${INSPECTOR_HIGHLIGHT_ATTR}]`);
      prev.forEach((el) => {
        (el as HTMLElement).style.outline = "";
        el.removeAttribute(INSPECTOR_HIGHLIGHT_ATTR);
      });
    }
  }, [inspector]);

  // ---------------------------------------------------------------------
  // Open preview content in a new browser tab
  // ---------------------------------------------------------------------

  const openInNewTab = useCallback(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!doc || !doc.documentElement) {
      toast("Preview not ready yet.", "error");
      return;
    }
    // Serialize the live iframe document. This captures the sanitized bio
    // HTML + the shell stylesheets (Google Fonts + the basic dark theme).
    const html = doc.documentElement.outerHTML;
    const w = window.open("", "_blank");
    if (!w) {
      toast("Popup blocked — allow popups for this site.", "error");
      return;
    }
    try {
      w.document.open();
      w.document.write(html);
      w.document.close();
      toast("Preview opened in a new tab.", "ok");
    } catch (e) {
      void e;
      toast("Failed to open preview.", "error");
    }
  }, [toast]);

  // ---------------------------------------------------------------------
  // Screenshot — try SVG foreignObject → canvas → PNG; fall back to a
  // self-contained .html download if the canvas is tainted or rendering
  // fails. We strip cross-origin <img> tags from the cloned body to avoid
  // tainting the canvas with the PNG path; the HTML fallback keeps them.
  // ---------------------------------------------------------------------

  const screenshot = useCallback(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!doc || !doc.body) {
      toast("Preview not ready yet.", "error");
      return;
    }

    const stamp = dateStamp();
    const htmlFallback = () => {
      try {
        const fullHtml = doc.documentElement.outerHTML;
        const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
        downloadBlob(blob, `forge-preview-${stamp}.html`);
        toast("Saved preview as HTML (PNG not available).", "note");
      } catch {
        toast("Screenshot failed.", "error");
      }
    };

    try {
      const body = doc.body;
      const width = Math.max(body.scrollWidth, 320);
      const height = Math.max(body.scrollHeight, 240);

      // Clone the body and strip the inspector tooltip / highlight artifacts
      // + cross-origin images so the canvas can't be tainted.
      const cloned = body.cloneNode(true) as HTMLElement;
      cloned
        .querySelectorAll(
          `#${INSPECTOR_TIP_ID}, [${INSPECTOR_HIGHLIGHT_ATTR}]`,
        )
        .forEach((el) => el.remove());
      // Remove <img> tags entirely (their cross-origin src would taint the
      // canvas) — leave a placeholder div of the same size so layout is
      // roughly preserved.
      const imgs = cloned.querySelectorAll("img");
      imgs.forEach((img) => {
        const placeholder = doc.createElement("div");
        placeholder.setAttribute(
          "style",
          "display:inline-block;background:#1d1828;border:1px dashed #3a3250;" +
            "color:#9691a0;font-size:10px;padding:4px 6px;border-radius:3px;",
        );
        placeholder.textContent = "image";
        const w = img.getAttribute("width");
        const h = img.getAttribute("height");
        if (w) (placeholder.style as CSSStyleDeclaration).width = w + "px";
        if (h) (placeholder.style as CSSStyleDeclaration).height = h + "px";
        img.replaceWith(placeholder);
      });

      const bodyXml = new XMLSerializer().serializeToString(cloned);
      // Collect <style> blocks from the iframe head so the screenshot keeps
      // the basic shell styling (dark bg, text color, image sizing).
      const headStyles = Array.from(doc.querySelectorAll("style"))
        .map((s) => s.outerHTML)
        .join("");
      const foreign =
        `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head>` +
        `<meta charset="utf-8">` +
        `<style>html,body{background:#141018 !important;color:#e7e2ee !important;margin:0;padding:0;}</style>` +
        headStyles +
        `</head><body>${bodyXml}</body></html>`;

      const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"` +
        ` viewBox="0 0 ${width} ${height}">` +
        `<foreignObject width="100%" height="100%">${foreign}</foreignObject>` +
        `</svg>`;

      const blob = new Blob([svg], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      // For SVG-as-image, crossorigin must be set BEFORE the src. Even so,
      // drawing to canvas can throw if the SVG embeds any tainted content.
      // We strip images above to minimize that risk.
      img.crossOrigin = "anonymous";
      const cleanup = () => URL.revokeObjectURL(url);
      // Safety timeout — if the SVG doesn't load in 4s, fall back.
      const t = setTimeout(() => {
        cleanup();
        htmlFallback();
      }, 4000);
      img.onload = () => {
        clearTimeout(t);
        cleanup();
        try {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            htmlFallback();
            return;
          }
          ctx.fillStyle = "#141018";
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = `forge-preview-${stamp}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          toast("Screenshot saved as PNG.", "ok");
        } catch {
          // Tainted canvas — fall back to HTML download.
          htmlFallback();
        }
      };
      img.onerror = () => {
        clearTimeout(t);
        cleanup();
        htmlFallback();
      };
      img.src = url;
    } catch {
      htmlFallback();
    }
  }, [toast]);

  // ---------------------------------------------------------------------
  // Derived layout values
  // ---------------------------------------------------------------------

  const deviceWidth =
    deviceMode === "mobile" ? 375 : deviceMode === "tablet" ? 768 : null;
  const isConstrained = deviceWidth !== null;
  const zoomScale = zoom / 100;

  return (
    <div
      className="forge-pane forge-preview-pane"
      style={{ minHeight: "100%", height: "100%" }}
    >
      <div className="forge-pane-head forge-preview-head">
        <span className="forge-preview-title">Live Preview</span>
        <div
          className="forge-preview-seg"
          role="group"
          aria-label="Preview device mode"
          title="Preview device width"
        >
          <button
            type="button"
            className={`forge-preview-seg-btn${
              deviceMode === "mobile" ? " on" : ""
            }`}
            onClick={() => setDeviceMode("mobile")}
            title="Mobile · 375px"
            aria-pressed={deviceMode === "mobile"}
          >
            <Smartphone size={12} />
          </button>
          <button
            type="button"
            className={`forge-preview-seg-btn${
              deviceMode === "tablet" ? " on" : ""
            }`}
            onClick={() => setDeviceMode("tablet")}
            title="Tablet · 768px"
            aria-pressed={deviceMode === "tablet"}
          >
            <Tablet size={12} />
          </button>
          <button
            type="button"
            className={`forge-preview-seg-btn${
              deviceMode === "desktop" ? " on" : ""
            }`}
            onClick={() => setDeviceMode("desktop")}
            title="Desktop · 100%"
            aria-pressed={deviceMode === "desktop"}
          >
            <Monitor size={12} />
          </button>
        </div>
        <div className="forge-preview-zoom" title="Preview zoom">
          <button
            type="button"
            className="forge-preview-icon-btn"
            onClick={() => setZoom(zoom - 10)}
            disabled={zoom <= 25}
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut size={12} />
          </button>
          <span className="forge-preview-zoom-label">{zoom}%</span>
          <button
            type="button"
            className="forge-preview-icon-btn"
            onClick={() => setZoom(zoom + 10)}
            disabled={zoom >= 200}
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomIn size={12} />
          </button>
          <button
            type="button"
            className="forge-preview-icon-btn"
            onClick={() => setZoom(100)}
            disabled={zoom === 100}
            title="Reset zoom"
            aria-label="Reset zoom"
          >
            <RotateCcw size={12} />
          </button>
        </div>
        <button
          type="button"
          className={`forge-preview-icon-btn${
            inspector ? " on" : ""
          }`}
          onClick={toggleInspector}
          title={
            inspector
              ? "Inspector ON — hover to inspect, click to jump"
              : "Turn on element inspector"
          }
          aria-pressed={inspector}
          aria-label="Toggle element inspector"
        >
          <MousePointer2 size={12} />
        </button>
        <button
          type="button"
          className="forge-preview-icon-btn"
          onClick={openInNewTab}
          title="Open preview in a new tab"
          aria-label="Open preview in a new tab"
        >
          <ExternalLink size={12} />
        </button>
        <button
          type="button"
          className="forge-preview-icon-btn"
          onClick={screenshot}
          title="Screenshot (PNG, falls back to HTML)"
          aria-label="Take a screenshot"
        >
          <Camera size={12} />
        </button>
        <span className="hint forge-preview-stat">{sectionStat}</span>
      </div>
      <div className="forge-preview-stage">
        <div
          className={`forge-device-frame mode-${deviceMode}${
            isConstrained ? " constrained" : ""
          }`}
          style={{
            width: deviceWidth ? `${deviceWidth}px` : "100%",
            transform: `scale(${zoomScale})`,
            transformOrigin: "top center",
          }}
        >
          <iframe
            ref={iframeRef}
            id="forge-preview"
            className="forge-preview"
            title="Live preview"
            sandbox="allow-same-origin"
            srcDoc={shell}
          />
        </div>
      </div>
    </div>
  );
}
