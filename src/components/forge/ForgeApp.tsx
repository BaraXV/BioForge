"use client";

import { useEffect, useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useForge } from "@/store/forge/useForge";
import MetaBar from "./MetaBar";
import Toolbar from "./Toolbar";
import CodeEditor from "./CodeEditor";
import PreviewPane from "./PreviewPane";
import SectionNavigator from "./SectionNavigator";
import ToastHost from "./ToastHost";

export default function ForgeApp() {
  const hydrate = useForge((s) => s.hydrate);
  const hydrated = useForge((s) => s.hydrated);
  const charCount = useForge((s) => s.charCount);
  const wordCount = useForge((s) => s.wordCount);
  const htmlContent = useForge((s) => s.html);
  const setHtml = useForge((s) => s.setHtml);
  const toast = useForge((s) => s.toast);
  const refreshPreview = useForge((s) => s.refreshPreview);
  const jumpRequestRef = useRef<((line: number) => void) | null>(null);
  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");

  // Hydrate vault on mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Responsive: stack vertically on narrow screens
  useEffect(() => {
    const update = () => {
      setLayout(window.innerWidth < 900 ? "vertical" : "horizontal");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    if (!hydrated) return;
    const handler = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const key = e.key.toLowerCase();
      if (key === "s") {
        e.preventDefault();
        // Force a vault flush by re-setting the html
        setHtml(useForge.getState().html);
        toast("Saved to vault.", "ok");
      } else if (e.shiftKey && key === "f") {
        e.preventDefault();
        // Trigger format via the toolbar — dispatch a custom event
        document.dispatchEvent(new CustomEvent("forge:format"));
      } else if (e.shiftKey && key === "l") {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent("forge:lint"));
      } else if (e.shiftKey && key === "p") {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent("forge:publish"));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hydrated, setHtml, toast]);

  // Live char/word count badge update
  const statText = `${charCount.toLocaleString()} chars · ${wordCount.toLocaleString()} words`;

  if (!hydrated) {
    return (
      <div className="forge-root">
        <div className="forge-wrap" style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "var(--forge-dim)", fontSize: 14 }}>
            Loading vault…
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forge-root">
      <div className="forge-wrap">
        <MetaBar />
        <Toolbar onOpenAbout={() => {}} onOpenToken={() => {}} />

        <div className="forge-cols" style={{ minHeight: 0 }}>
          <ResizablePanelGroup
            direction={layout}
            style={{ gap: 0, flex: 1, minHeight: 0 }}
          >
            <ResizablePanel defaultSize={42} minSize={25}>
              <div className="forge-pane" style={{ minHeight: "100%", height: "100%" }}>
                <div className="forge-pane-head">
                  <span>HTML Source</span>
                  <span>
                    <em>{statText}</em>
                  </span>
                </div>
                <CodeEditor onJumpRequest={() => {}} />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={42} minSize={25}>
              <div className="forge-pane" style={{ minHeight: "100%", height: "100%" }}>
                <div className="forge-pane-head">
                  <span>Live Preview</span>
                  <span className="hint">click any section to jump to its code ⇗</span>
                </div>
                <PreviewPane />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={16} minSize={12}>
              <div className="forge-pane" style={{ minHeight: "100%", height: "100%" }}>
                <div className="forge-pane-head">
                  <span>Sections</span>
                  <span className="hint">click to jump</span>
                </div>
                <SectionNavigator />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        <footer
          style={{
            marginTop: "auto",
            padding: "8px 0",
            fontSize: 10,
            color: "var(--forge-dim)",
            textAlign: "center",
            borderTop: "1px solid var(--forge-edge)",
            flexShrink: 0,
          }}
        >
          JAI FORGE v1.0 · Next.js 16 · Local-only vault ·{" "}
          <button
            onClick={() => refreshPreview()}
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "var(--forge-accent2)",
              cursor: "pointer",
              fontSize: 10,
              textDecoration: "underline",
            }}
          >
            refresh preview
          </button>
        </footer>
      </div>
      <ToastHost />
    </div>
  );
}
