"use client";

import { useEffect, useState } from "react";
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
  const forceSave = useForge((s) => s.forceSave);
  const toast = useForge((s) => s.toast);
  const refreshPreview = useForge((s) => s.refreshPreview);
  const appTheme = useForge((s) => s.appTheme);
  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");

  // Hydrate vault on mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Sync the app theme to the DOM:
  //   - .forge-root gets data-theme="light"|"dark" so the --forge-* tokens
  //     re-skin the whole forge chrome (panes, inputs, buttons, etc.)
  //   - <html> gets/loses the .dark class so shadcn-portaled dialogs (which
  //     render outside .forge-root) also pick up the matching palette via
  //     the html:not(.dark) overrides in globals.css.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (appTheme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [appTheme]);

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
      // Cheatsheet shortcut: `?` (Shift+/). Skip when typing in an input,
      // textarea, or contenteditable host so users can type the literal char.
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName ?? "";
      const isEditable =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable === true;
      if (!isEditable && !e.ctrlKey && !e.metaKey && !e.altKey && e.key === "?") {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent("forge:shortcuts"));
        return;
      }

      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const key = e.key.toLowerCase();
      if (key === "s") {
        e.preventDefault();
        // Force a vault flush — cancels any pending debounced write and
        // persists immediately so the "Saved" toast is honest.
        forceSave();
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
  }, [hydrated, forceSave, toast]);

  // Live char/word count badge update
  const statText = `${charCount.toLocaleString()} chars · ${wordCount.toLocaleString()} words`;

  if (!hydrated) {
    return (
      <div className="forge-root" data-theme={appTheme}>
        <div className="forge-wrap" style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "var(--forge-dim)", fontSize: 14 }}>
            Loading vault…
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forge-root" data-theme={appTheme}>
      <div className="forge-wrap">
        <MetaBar />
        <Toolbar />

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
                <CodeEditor />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={42} minSize={25}>
              <PreviewPane />
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
