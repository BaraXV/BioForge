(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/resizable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResizableHandle",
    ()=>ResizableHandle,
    "ResizablePanel",
    ()=>ResizablePanel,
    "ResizablePanelGroup",
    ()=>ResizablePanelGroup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVerticalIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVerticalIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-resizable-panels/dist/react-resizable-panels.browser.development.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function ResizablePanelGroup({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelGroup"], {
        "data-slot": "resizable-panel-group",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/resizable.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = ResizablePanelGroup;
function ResizablePanel({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
        "data-slot": "resizable-panel",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/resizable.tsx",
        lineNumber: 28,
        columnNumber: 10
    }, this);
}
_c1 = ResizablePanel;
function ResizableHandle({ withHandle, className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelResizeHandle"], {
        "data-slot": "resizable-handle",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90", className),
        ...props,
        children: withHandle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVerticalIcon$3e$__["GripVerticalIcon"], {
                className: "size-2.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/resizable.tsx",
                lineNumber: 49,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/resizable.tsx",
            lineNumber: 48,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/resizable.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c2 = ResizableHandle;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ResizablePanelGroup");
__turbopack_context__.k.register(_c1, "ResizablePanel");
__turbopack_context__.k.register(_c2, "ResizableHandle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/forge/vault.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSnippet",
    ()=>createSnippet,
    "loadVault",
    ()=>loadVault,
    "saveVault",
    ()=>saveVault
]);
/**
 * Vault — localStorage persistence with multi-snippet support (new feature).
 *
 * The original BioForge stored a single bio. This version supports a named
 * snippet library so the user can keep multiple bios and switch between them.
 * Backward-compatible: imports the old `forge-html` key on first load.
 */ const LS_SNIPPETS = "forge-snippets";
const LS_ACTIVE = "forge-active-snippet";
const LS_META = "forge-meta";
const LS_BACKUP = "forge-html-backup"; // legacy
function safeParse(raw, fallback) {
    if (!raw) return fallback;
    try {
        return JSON.parse(raw);
    } catch  {
        return fallback;
    }
}
function loadVault() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let snippets = safeParse(localStorage.getItem(LS_SNIPPETS), []);
    let activeId = localStorage.getItem(LS_ACTIVE);
    // Migrate legacy single-bio storage on first load
    if (snippets.length === 0) {
        const legacy = localStorage.getItem("forge-html") || localStorage.getItem(LS_BACKUP) || "";
        if (legacy.trim()) {
            const snip = {
                id: "migrated",
                name: "Migrated bio",
                html: legacy,
                updatedAt: Date.now()
            };
            snippets = [
                snip
            ];
            activeId = snip.id;
            localStorage.setItem(LS_SNIPPETS, JSON.stringify(snippets));
            localStorage.setItem(LS_ACTIVE, activeId);
        }
    }
    // Ensure there is always at least one snippet
    if (snippets.length === 0) {
        const snip = {
            id: "default",
            name: "Untitled bio",
            html: "",
            updatedAt: Date.now()
        };
        snippets = [
            snip
        ];
        activeId = snip.id;
    }
    if (!activeId || !snippets.find((s)=>s.id === activeId)) {
        activeId = snippets[0].id;
    }
    const meta = safeParse(localStorage.getItem(LS_META), {
        target: "",
        token: "",
        theme: "",
        saved: 0
    });
    return {
        snippets,
        activeId,
        meta
    };
}
function saveVault(data) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(LS_SNIPPETS, JSON.stringify(data.snippets));
        localStorage.setItem(LS_ACTIVE, data.activeId ?? "");
        localStorage.setItem(LS_META, JSON.stringify({
            ...data.meta,
            saved: Date.now()
        }));
    } catch (e) {
        throw new Error("Vault: could not save — storage blocked or quota exceeded. " + (e instanceof Error ? e.message : ""));
    }
}
function createSnippet(name) {
    return {
        id: "snip-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7),
        name: name || "Untitled bio",
        html: "",
        updatedAt: Date.now()
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/forge/useForge.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useForge",
    ()=>useForge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/vault.ts [app-client] (ecmascript)");
/**
 * Forge store — central state for the JAI FORGE editor.
 * Uses Zustand for lightweight client state management.
 */ "use client";
;
;
let toastId = 0;
function countWords(s) {
    const t = s.replace(/<[^>]*>/g, " ").trim();
    if (!t) return 0;
    return t.split(/\s+/).length;
}
const useForge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        snippets: [],
        activeId: null,
        meta: {
            target: "",
            token: "",
            theme: "",
            saved: 0
        },
        html: "",
        charCount: 0,
        wordCount: 0,
        sectionCount: 0,
        syncOn: true,
        lineWrap: true,
        editorTheme: "dark",
        previewKey: 0,
        previewLabeledCount: 0,
        previewWired: false,
        previewAccessible: false,
        diffLines: [],
        toasts: [],
        hydrated: false,
        hydrate: ()=>{
            if (get().hydrated) return;
            const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadVault"])();
            const active = v.snippets.find((s)=>s.id === v.activeId) ?? v.snippets[0];
            set({
                snippets: v.snippets,
                activeId: active?.id ?? null,
                meta: v.meta,
                html: active?.html ?? "",
                charCount: (active?.html ?? "").length,
                wordCount: countWords(active?.html ?? ""),
                hydrated: true
            });
        },
        setHtml: (html)=>{
            const state = get();
            set({
                html,
                charCount: html.length,
                wordCount: countWords(html)
            });
            // Persist to active snippet (debounced via caller)
            if (state.activeId) {
                const snippets = state.snippets.map((s)=>s.id === state.activeId ? {
                        ...s,
                        html,
                        updatedAt: Date.now()
                    } : s);
                try {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveVault"])({
                        snippets,
                        activeId: state.activeId,
                        meta: state.meta
                    });
                    set({
                        snippets
                    });
                } catch (e) {
                    get().toast(e instanceof Error ? e.message : "Vault save failed", "error");
                }
            }
        },
        setMeta: (partial)=>{
            const meta = {
                ...get().meta,
                ...partial
            };
            set({
                meta
            });
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveVault"])({
                    snippets: get().snippets,
                    activeId: get().activeId,
                    meta
                });
            } catch (e) {
                get().toast(e instanceof Error ? e.message : "Meta save failed", "error");
            }
        },
        toggleSync: ()=>{
            const on = !get().syncOn;
            set({
                syncOn: on
            });
            get().toast("Sync scroll " + (on ? "on." : "off."), "ok");
        },
        toggleLineWrap: ()=>{
            set({
                lineWrap: !get().lineWrap
            });
        },
        toggleEditorTheme: ()=>{
            set({
                editorTheme: get().editorTheme === "dark" ? "light" : "dark"
            });
        },
        refreshPreview: ()=>{
            set({
                previewKey: get().previewKey + 1,
                diffLines: []
            });
        },
        setPreviewState: (s)=>{
            set({
                previewLabeledCount: s.labeled,
                previewWired: s.wired,
                previewAccessible: s.accessible
            });
        },
        setDiffLines: (lines)=>set({
                diffLines: lines
            }),
        clearDiff: ()=>set({
                diffLines: []
            }),
        addSnippet: (name)=>{
            const snip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSnippet"])(name);
            const snippets = [
                ...get().snippets,
                snip
            ];
            set({
                snippets,
                activeId: snip.id,
                html: "",
                charCount: 0,
                wordCount: 0,
                diffLines: []
            });
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveVault"])({
                    snippets,
                    activeId: snip.id,
                    meta: get().meta
                });
            } catch (e) {
                get().toast(e instanceof Error ? e.message : "Save failed", "error");
            }
            get().toast(`Created "${snip.name}".`, "ok");
        },
        switchSnippet: (id)=>{
            const snip = get().snippets.find((s)=>s.id === id);
            if (!snip) return;
            set({
                activeId: id,
                html: snip.html,
                charCount: snip.html.length,
                wordCount: countWords(snip.html),
                diffLines: []
            });
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveVault"])({
                    snippets: get().snippets,
                    activeId: id,
                    meta: get().meta
                });
            } catch (e) {
                get().toast(e instanceof Error ? e.message : "Save failed", "error");
            }
            get().refreshPreview();
        },
        renameSnippet: (id, name)=>{
            const snippets = get().snippets.map((s)=>s.id === id ? {
                    ...s,
                    name,
                    updatedAt: Date.now()
                } : s);
            set({
                snippets
            });
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveVault"])({
                    snippets,
                    activeId: get().activeId,
                    meta: get().meta
                });
            } catch (e) {
                get().toast(e instanceof Error ? e.message : "Save failed", "error");
            }
        },
        deleteSnippet: (id)=>{
            const snippets = get().snippets.filter((s)=>s.id !== id);
            if (snippets.length === 0) {
                // Keep at least one
                const fresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSnippet"])("Untitled bio");
                snippets.push(fresh);
                set({
                    snippets,
                    activeId: fresh.id,
                    html: "",
                    charCount: 0,
                    wordCount: 0,
                    diffLines: []
                });
            } else {
                const stillActive = get().activeId === id;
                set({
                    snippets,
                    activeId: stillActive ? snippets[0].id : get().activeId,
                    html: stillActive ? snippets[0].html : get().html,
                    charCount: stillActive ? snippets[0].html.length : get().charCount,
                    wordCount: stillActive ? countWords(snippets[0].html) : get().wordCount
                });
            }
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveVault"])({
                    snippets,
                    activeId: get().activeId,
                    meta: get().meta
                });
            } catch (e) {
                get().toast(e instanceof Error ? e.message : "Save failed", "error");
            }
            get().toast("Snippet deleted.", "ok");
        },
        duplicateSnippet: (id)=>{
            const src = get().snippets.find((s)=>s.id === id);
            if (!src) return;
            const copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSnippet"])(src.name + " (copy)");
            copy.html = src.html;
            const snippets = [
                ...get().snippets,
                copy
            ];
            set({
                snippets,
                activeId: copy.id,
                html: copy.html,
                charCount: copy.html.length,
                wordCount: countWords(copy.html),
                diffLines: []
            });
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveVault"])({
                    snippets,
                    activeId: copy.id,
                    meta: get().meta
                });
            } catch (e) {
                get().toast(e instanceof Error ? e.message : "Save failed", "error");
            }
            get().toast(`Duplicated to "${copy.name}".`, "ok");
        },
        toast: (message, kind = "note", detail, sticky = false)=>{
            const id = ++toastId;
            set({
                toasts: [
                    ...get().toasts,
                    {
                        id,
                        message,
                        kind,
                        detail,
                        sticky
                    }
                ]
            });
            const ttl = sticky ? 15000 : 4000;
            setTimeout(()=>{
                set({
                    toasts: get().toasts.filter((t)=>t.id !== id)
                });
            }, ttl);
        },
        dismissToast: (id)=>{
            set({
                toasts: get().toasts.filter((t)=>t.id !== id)
            });
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/dialogs/AboutDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AboutDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hexagon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hexagon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hexagon.js [app-client] (ecmascript) <export default as Hexagon>");
"use client";
;
;
;
;
function AboutDialog({ open, onOpenChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-2xl",
            style: {
                background: "var(--forge-panel)",
                color: "var(--forge-text)",
                border: "1px solid var(--forge-edge)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "flex items-center gap-2",
                        style: {
                            color: "var(--forge-accent2)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hexagon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hexagon$3e$__["Hexagon"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this),
                            " JAI FORGE v1.0 — Next.js edition"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        color: "var(--forge-dim)",
                        fontSize: 13,
                        lineHeight: 1.7
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                marginTop: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    style: {
                                        color: "var(--forge-text)"
                                    },
                                    children: "Double-wrapper aware:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this),
                                " the block mapper reads the actual house format — background wrapper, max-width container, sections inside at depth 2."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    style: {
                                        color: "var(--forge-text)"
                                    },
                                    children: "Sandboxed preview:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this),
                                " scripts, event handlers, iframes, and embeds are stripped before rendering — pasting foreign HTML is safe."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    style: {
                                        color: "var(--forge-text)"
                                    },
                                    children: "Multi-snippet vault:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                " keep multiple bios in the local snippet library and switch between them instantly. Everything autosaves to your browser."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                style: {
                                    color: "var(--forge-text)"
                                },
                                children: "Keyboard shortcuts:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            style: {
                                margin: "4px 0",
                                paddingLeft: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            children: "Ctrl/Cmd + S"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                            lineNumber: 51,
                                            columnNumber: 17
                                        }, this),
                                        " — Save (force vault flush)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            children: "Ctrl/Cmd + Shift + F"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                            lineNumber: 52,
                                            columnNumber: 17
                                        }, this),
                                        " — Format"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            children: "Ctrl/Cmd + Shift + L"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                            lineNumber: 53,
                                            columnNumber: 17
                                        }, this),
                                        " — Lint"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            children: "Ctrl/Cmd + Shift + P"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                            lineNumber: 54,
                                            columnNumber: 17
                                        }, this),
                                        " — Publish"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            children: "Ctrl/Cmd + F"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                            lineNumber: 55,
                                            columnNumber: 17
                                        }, this),
                                        " — Find (CodeMirror built-in)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                marginBottom: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    style: {
                                        color: "var(--forge-ember)"
                                    },
                                    children: "Be decent:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                " only publish to characters and scripts you own."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        onClick: ()=>onOpenChange(false),
                        type: "button",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/forge/dialogs/AboutDialog.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = AboutDialog;
var _c;
__turbopack_context__.k.register(_c, "AboutDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollArea",
    ()=>ScrollArea,
    "ScrollBar",
    ()=>ScrollBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function ScrollArea({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "scroll-area",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                "data-slot": "scroll-area-viewport",
                className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Corner"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = ScrollArea;
function ScrollBar({ className, orientation = "vertical", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"], {
        "data-slot": "scroll-area-scrollbar",
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaThumb"], {
            "data-slot": "scroll-area-thumb",
            className: "bg-border relative flex-1 rounded-full"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/scroll-area.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c1 = ScrollBar;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "ScrollArea");
__turbopack_context__.k.register(_c1, "ScrollBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/forge/publisher.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Target URL parser + publish/build helpers for JanitorAI.
 *
 * BUGFIX vs original:
 *  - UUID regex is now strict ([0-9a-f]{8}-[0-9a-f]{4}-... ) instead of the
 *    loose [0-9a-f-]{36} which could match arbitrary dash-hex strings.
 */ __turbopack_context__.s([
    "TOKEN_SCRIPT",
    ()=>TOKEN_SCRIPT,
    "buildConsoleScript",
    ()=>buildConsoleScript,
    "buildLoadScript",
    ()=>buildLoadScript,
    "parseTarget",
    ()=>parseTarget
]);
const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
function parseTarget(url) {
    const u = url.trim();
    let m = /janitorai\.com\/characters\/([0-9a-f-]{36})/i.exec(u);
    if (m && UUID_RE.test(m[1])) return {
        kind: "character",
        uuid: m[1]
    };
    m = /janitorai\.com\/scripts\/([0-9a-f-]{36})/i.exec(u);
    if (m && UUID_RE.test(m[1])) return {
        kind: "script",
        uuid: m[1]
    };
    return null;
}
function buildConsoleScript(target, token, html) {
    const payload = JSON.stringify(html);
    if (target.kind === "character") {
        const url = `https://janitorai.com/mb/characters/${target.uuid}`;
        return [
            "(async () => {",
            `  const r = await fetch("${url}", {`,
            '    method: "PATCH", credentials: "include",',
            `    headers: { "content-type": "application/json", "authorization": "Bearer ${token}" },`,
            `    body: JSON.stringify({ description: ${payload} })`,
            "  });",
            '  console.log(r.ok ? "FORGE: published." : "FORGE rejected " + r.status);',
            "})();"
        ].join("\n");
    }
    const url = `https://janitorai.com/hampter/script/${target.uuid}/content`;
    return [
        "(async () => {",
        '  for (const type of ["draft", "published"]) {',
        `    const r = await fetch("${url}", {`,
        '      method: "PUT", credentials: "include",',
        `      headers: { "content-type": "application/json", "authorization": "Bearer ${token}" },`,
        `      body: JSON.stringify({ type: type, content: ${payload} })`,
        "    });",
        '    console.log("FORGE (" + type + "):", r.ok ? "ok" : "rejected " + r.status);',
        "  }",
        "})();"
    ].join("\n");
}
function buildLoadScript(target, token) {
    const path = target.kind === "character" ? `/hampter/characters/${target.uuid}` : `/hampter/script/${target.uuid}/content?type=published`;
    const accessor = target.kind === "character" ? "d.description" : "d.content";
    return [
        "(async () => {",
        `  const r = await fetch("https://janitorai.com${path}", {`,
        '    method: "GET", credentials: "include",',
        `    headers: { "content-type": "application/json", "authorization": "Bearer ${token}" }`,
        "  });",
        "  const d = await r.json();",
        `  const c = ${accessor};`,
        '  if (typeof c === "string") { console.log("=== FORGE LIVE: COPY BELOW ==="); console.log(c); console.log("=== END ==="); }',
        '  else console.log("FORGE: no content");',
        "})();"
    ].join("\n");
}
const TOKEN_SCRIPT = [
    "(() => {",
    "  function getCookie(name) {",
    "    const value = `; ${document.cookie}`;",
    "    const parts = value.split(`; ${name}=`);",
    '    if (parts.length === 2) return parts.pop().split(";").shift();',
    "    return null;",
    "  }",
    '  const cm = document.cookie.match(/(?:^|;\\s*)(sb-[^=]+-auth-token)(?:\\.\\d+)?=/);',
    '  const base = cm ? cm[1] : "sb-auth-auth-token";',
    "  let raw = getCookie(base);",
    "  if (!raw) {",
    "    const chunks = [];",
    "    for (let i = 0; ; i++) {",
    "      const c = getCookie(`${base}.${i}`);",
    "      if (c === null) break;",
    "      chunks.push(c);",
    "    }",
    '    if (chunks.length > 0) raw = chunks.join("");',
    "  }",
    '  if (!raw) { console.log("No token found"); return; }',
    "  try {",
    '    let j = "";',
    '    if (raw.startsWith("base64-")) {',
    '      let b64 = raw.slice(7).replace(/-/g, "+").replace(/_/g, "/");',
    '      while (b64.length % 4) b64 += "=";',
    '      const bin = atob(b64);',
    '      const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));',
    '      j = new TextDecoder().decode(bytes);',
    '    } else { j = decodeURIComponent(raw); }',
    "    const json = JSON.parse(j);",
    '    if (json?.access_token) console.log(json.access_token);',
    '    else console.log("No access token found");',
    "  } catch (e) { console.error(\"Failed to parse token\", e); }",
    "})();"
].join("\n");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/dialogs/TokenDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TokenDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/key-round.js [app-client] (ecmascript) <export default as KeyRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$publisher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/publisher.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/forge/useForge.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function TokenDialog({ open, onOpenChange }) {
    _s();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "TokenDialog.useForge[toast]": (s)=>s.toast
    }["TokenDialog.useForge[toast]"]);
    const handleCopy = async ()=>{
        try {
            await navigator.clipboard.writeText(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$publisher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_SCRIPT"]);
            toast("Token script copied.", "ok");
        } catch  {
            toast("Copy failed — select the text manually.", "error");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-2xl",
            style: {
                background: "var(--forge-panel)",
                color: "var(--forge-text)",
                border: "1px solid var(--forge-edge)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "flex items-center gap-2",
                        style: {
                            color: "var(--forge-accent2)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__["KeyRound"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this),
                            " Get your access token"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: "var(--forge-dim)",
                        fontSize: 13,
                        lineHeight: 1.7
                    },
                    children: [
                        "1. Copy the script below.",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                            lineNumber: 46,
                            columnNumber: 36
                        }, this),
                        "2. Open ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            children: "janitorai.com"
                        }, void 0, false, {
                            fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                            lineNumber: 47,
                            columnNumber: 19
                        }, this),
                        " logged in.",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                            lineNumber: 47,
                            columnNumber: 56
                        }, this),
                        "3. Press ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                            children: "F12"
                        }, void 0, false, {
                            fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                            lineNumber: 48,
                            columnNumber: 20
                        }, this),
                        " → Console → paste → Enter.",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                            lineNumber: 48,
                            columnNumber: 61
                        }, this),
                        "4. Copy the printed token into the Access Token field."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                    className: "max-h-[50vh] rounded-md",
                    style: {
                        background: "rgba(8,7,12,0.85)",
                        border: "1px solid var(--forge-edge)"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        style: {
                            padding: 10,
                            fontSize: 11,
                            color: "var(--forge-gold)",
                            whiteSpace: "pre",
                            fontFamily: "Consolas, monospace",
                            margin: 0
                        },
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$publisher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_SCRIPT"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleCopy,
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            " Copy Script"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/forge/dialogs/TokenDialog.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(TokenDialog, "LSfIGDAGSnjJpaRNf70+scJECtI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"]
    ];
});
_c = TokenDialog;
var _c;
__turbopack_context__.k.register(_c, "TokenDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/dialogs/SnippetManager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SnippetManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/forge/useForge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function SnippetManager({ open, onOpenChange }) {
    _s();
    const snippets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "SnippetManager.useForge[snippets]": (s)=>s.snippets
    }["SnippetManager.useForge[snippets]"]);
    const activeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "SnippetManager.useForge[activeId]": (s)=>s.activeId
    }["SnippetManager.useForge[activeId]"]);
    const addSnippet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "SnippetManager.useForge[addSnippet]": (s)=>s.addSnippet
    }["SnippetManager.useForge[addSnippet]"]);
    const switchSnippet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "SnippetManager.useForge[switchSnippet]": (s)=>s.switchSnippet
    }["SnippetManager.useForge[switchSnippet]"]);
    const renameSnippet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "SnippetManager.useForge[renameSnippet]": (s)=>s.renameSnippet
    }["SnippetManager.useForge[renameSnippet]"]);
    const deleteSnippet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "SnippetManager.useForge[deleteSnippet]": (s)=>s.deleteSnippet
    }["SnippetManager.useForge[deleteSnippet]"]);
    const duplicateSnippet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "SnippetManager.useForge[duplicateSnippet]": (s)=>s.duplicateSnippet
    }["SnippetManager.useForge[duplicateSnippet]"]);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editName, setEditName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleAdd = ()=>{
        const name = window.prompt("Snippet name:", "Untitled bio");
        if (name !== null) addSnippet(name);
    };
    const startEdit = (id, currentName)=>{
        setEditingId(id);
        setEditName(currentName);
    };
    const commitEdit = ()=>{
        if (editingId) renameSnippet(editingId, editName || "Untitled bio");
        setEditingId(null);
        setEditName("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-2xl",
            style: {
                background: "var(--forge-panel)",
                color: "var(--forge-text)",
                border: "1px solid var(--forge-edge)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "flex items-center gap-2",
                        style: {
                            color: "var(--forge-accent2)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this),
                            " Snippet Library"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: "var(--forge-dim)",
                        fontSize: 13,
                        margin: 0
                    },
                    children: [
                        snippets.length,
                        " snippet(s) stored locally. Click to load."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                    className: "max-h-[55vh] rounded-md",
                    style: {
                        background: "var(--forge-panel2)",
                        border: "1px solid var(--forge-edge)"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: 6
                        },
                        children: snippets.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "8px 10px",
                                    borderRadius: 6,
                                    marginBottom: 4,
                                    background: s.id === activeId ? "rgba(120,90,180,0.18)" : "transparent",
                                    border: s.id === activeId ? "1px solid var(--forge-accent)" : "1px solid transparent",
                                    cursor: "pointer"
                                },
                                onClick: ()=>{
                                    switchSnippet(s.id);
                                    onOpenChange(false);
                                },
                                children: editingId === s.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: editName,
                                            onChange: (e)=>setEditName(e.target.value),
                                            onClick: (e)=>e.stopPropagation(),
                                            onKeyDown: (e)=>{
                                                if (e.key === "Enter") commitEdit();
                                                if (e.key === "Escape") {
                                                    setEditingId(null);
                                                    setEditName("");
                                                }
                                            },
                                            autoFocus: true,
                                            style: {
                                                background: "var(--forge-bg)",
                                                color: "var(--forge-text)",
                                                border: "1px solid var(--forge-edge)",
                                                flex: 1,
                                                fontSize: 12
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                            lineNumber: 107,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "forge-btn ghost",
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                commitEdit();
                                            },
                                            type: "button",
                                            style: {
                                                padding: "4px 8px"
                                            },
                                            "aria-label": "Confirm rename",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                                lineNumber: 137,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                            lineNumber: 127,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "forge-btn ghost",
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                setEditingId(null);
                                                setEditName("");
                                            },
                                            type: "button",
                                            style: {
                                                padding: "4px 8px"
                                            },
                                            "aria-label": "Cancel rename",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                                lineNumber: 150,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                            lineNumber: 139,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 12,
                                                fontFamily: "Consolas, monospace",
                                                flex: 1,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                color: "var(--forge-text)"
                                            },
                                            children: s.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                            lineNumber: 155,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 10,
                                                color: "var(--forge-dim)",
                                                fontFamily: "monospace"
                                            },
                                            children: [
                                                s.html.length.toLocaleString(),
                                                " ch"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                            lineNumber: 168,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "forge-btn ghost",
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                startEdit(s.id, s.name);
                                            },
                                            type: "button",
                                            style: {
                                                padding: "4px 8px"
                                            },
                                            "aria-label": `Rename ${s.name}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                                lineNumber: 187,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                            lineNumber: 177,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "forge-btn ghost",
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                duplicateSnippet(s.id);
                                            },
                                            type: "button",
                                            style: {
                                                padding: "4px 8px"
                                            },
                                            "aria-label": `Duplicate ${s.name}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                                lineNumber: 199,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                            lineNumber: 189,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "forge-btn ghost",
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                if (window.confirm(`Delete "${s.name}"? This cannot be undone.`)) {
                                                    deleteSnippet(s.id);
                                                }
                                            },
                                            type: "button",
                                            style: {
                                                padding: "4px 8px"
                                            },
                                            "aria-label": `Delete ${s.name}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                                lineNumber: 217,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                            lineNumber: 201,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, s.id, false, {
                                fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleAdd,
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this),
                            " New Snippet"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
                    lineNumber: 225,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/forge/dialogs/SnippetManager.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(SnippetManager, "QqLXQFQN+Pdcbac70E5nHECquC4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"]
    ];
});
_c = SnippetManager;
var _c;
__turbopack_context__.k.register(_c, "SnippetManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/MetaBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MetaBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/forge/useForge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hexagon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hexagon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hexagon.js [app-client] (ecmascript) <export default as Hexagon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-client] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/key-round.js [app-client] (ecmascript) <export default as KeyRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-client] (ecmascript) <export default as ArrowUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrap$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WrapText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrap-text.js [app-client] (ecmascript) <export default as WrapText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$dialogs$2f$AboutDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forge/dialogs/AboutDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$dialogs$2f$TokenDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forge/dialogs/TokenDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$dialogs$2f$SnippetManager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forge/dialogs/SnippetManager.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function MetaBar() {
    _s();
    const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "MetaBar.useForge[meta]": (s)=>s.meta
    }["MetaBar.useForge[meta]"]);
    const setMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "MetaBar.useForge[setMeta]": (s)=>s.setMeta
    }["MetaBar.useForge[setMeta]"]);
    const syncOn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "MetaBar.useForge[syncOn]": (s)=>s.syncOn
    }["MetaBar.useForge[syncOn]"]);
    const toggleSync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "MetaBar.useForge[toggleSync]": (s)=>s.toggleSync
    }["MetaBar.useForge[toggleSync]"]);
    const lineWrap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "MetaBar.useForge[lineWrap]": (s)=>s.lineWrap
    }["MetaBar.useForge[lineWrap]"]);
    const toggleLineWrap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "MetaBar.useForge[toggleLineWrap]": (s)=>s.toggleLineWrap
    }["MetaBar.useForge[toggleLineWrap]"]);
    const editorTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "MetaBar.useForge[editorTheme]": (s)=>s.editorTheme
    }["MetaBar.useForge[editorTheme]"]);
    const toggleEditorTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "MetaBar.useForge[toggleEditorTheme]": (s)=>s.toggleEditorTheme
    }["MetaBar.useForge[toggleEditorTheme]"]);
    const activeSnippet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "MetaBar.useForge[activeSnippet]": (s)=>s.snippets.find({
                "MetaBar.useForge[activeSnippet]": (sn)=>sn.id === s.activeId
            }["MetaBar.useForge[activeSnippet]"])
    }["MetaBar.useForge[activeSnippet]"]);
    const [aboutOpen, setAboutOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tokenOpen, setTokenOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [snippetsOpen, setSnippetsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "forge-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hexagon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hexagon$3e$__["Hexagon"], {
                                size: 20,
                                style: {
                                    display: "inline",
                                    verticalAlign: "-3px",
                                    marginRight: 4
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/MetaBar.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            "JAI FORGE"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/MetaBar.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tag",
                        children: "v1.0 · Next.js edition"
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/MetaBar.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "forge-spacer"
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/MetaBar.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `forge-btn ghost ${syncOn ? "on" : ""}`,
                        onClick: toggleSync,
                        type: "button",
                        title: "Toggle sync scroll between editor and preview",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/MetaBar.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            " Sync: ",
                            syncOn ? "ON" : "OFF"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/MetaBar.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `forge-btn ghost ${lineWrap ? "on" : ""}`,
                        onClick: toggleLineWrap,
                        type: "button",
                        title: "Toggle line wrapping in the editor",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrap$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WrapText$3e$__["WrapText"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/MetaBar.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            " Wrap: ",
                            lineWrap ? "ON" : "OFF"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/MetaBar.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: toggleEditorTheme,
                        type: "button",
                        title: "Toggle editor color theme",
                        children: [
                            editorTheme === "dark" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/MetaBar.tsx",
                                lineNumber: 67,
                                columnNumber: 37
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/MetaBar.tsx",
                                lineNumber: 67,
                                columnNumber: 57
                            }, this),
                            editorTheme === "dark" ? "Light" : "Dark"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/MetaBar.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: ()=>setSnippetsOpen(true),
                        type: "button",
                        title: "Open snippet library",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/MetaBar.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            " Snippets"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/MetaBar.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: ()=>setAboutOpen(true),
                        type: "button",
                        title: "About JAI FORGE",
                        "aria-label": "About",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                            size: 13
                        }, void 0, false, {
                            fileName: "[project]/src/components/forge/MetaBar.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/MetaBar.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/forge/MetaBar.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "forge-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "forge-field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Target URL"
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/MetaBar.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "forge-input",
                                type: "text",
                                placeholder: "https://janitorai.com/characters/UUID...",
                                value: meta.target,
                                onChange: (e)=>setMeta({
                                        target: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/MetaBar.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/MetaBar.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "forge-field",
                        style: {
                            flex: "0 1 260px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Access Token"
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/MetaBar.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "forge-input",
                                type: "password",
                                placeholder: "from Get Token",
                                value: meta.token,
                                onChange: (e)=>setMeta({
                                        token: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/MetaBar.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/MetaBar.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: ()=>setTokenOpen(true),
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__["KeyRound"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/MetaBar.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            " Get Token"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/MetaBar.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/forge/MetaBar.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "forge-row",
                style: {
                    marginBottom: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: 11,
                        color: "var(--forge-dim)"
                    },
                    children: [
                        "Active: ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                            style: {
                                color: "var(--forge-accent2)"
                            },
                            children: activeSnippet?.name ?? "—"
                        }, void 0, false, {
                            fileName: "[project]/src/components/forge/MetaBar.tsx",
                            lineNumber: 121,
                            columnNumber: 19
                        }, this),
                        " · ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            id: "forge-stat",
                            children: [
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"].getState().charCount.toLocaleString(),
                                " chars",
                                " · ",
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"].getState().wordCount.toLocaleString(),
                                " words"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/forge/MetaBar.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/forge/MetaBar.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/forge/MetaBar.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$dialogs$2f$AboutDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: aboutOpen,
                onOpenChange: setAboutOpen
            }, void 0, false, {
                fileName: "[project]/src/components/forge/MetaBar.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$dialogs$2f$TokenDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: tokenOpen,
                onOpenChange: setTokenOpen
            }, void 0, false, {
                fileName: "[project]/src/components/forge/MetaBar.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$dialogs$2f$SnippetManager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: snippetsOpen,
                onOpenChange: setSnippetsOpen
            }, void 0, false, {
                fileName: "[project]/src/components/forge/MetaBar.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(MetaBar, "SNkmqWy3GmbtjmWHohQE0FbJ7FI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"]
    ];
});
_c = MetaBar;
var _c;
__turbopack_context__.k.register(_c, "MetaBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/forge/formatter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatSource",
    ()=>formatSource
]);
/**
 * Block-level HTML formatter.
 *
 * Indents block-level tags while keeping inline tags (<span>, <strong>, etc.)
 * on the same line as their surrounding text. Preserves <pre> blocks and
 * HTML comments verbatim. Preserves numeric character entities (&#9670;).
 */ const VOIDF = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
]);
const INLINE_TAGS = new Set([
    "span",
    "strong",
    "em",
    "b",
    "i",
    "u",
    "a",
    "code",
    "mark",
    "small",
    "sub",
    "sup"
]);
function formatSource(html) {
    if (!html.trim()) return html;
    const out = [];
    let indent = 0;
    let pos = 0;
    const re = /(<pre[\s\S]*?<\/pre>)|(<!--[\s\S]*?-->)|(<\/?[a-zA-Z][^>]*?(?:"[^"]*"|'[^']*'|[^>"'])*>)/g;
    let m;
    const pad = (n)=>n === 0 ? "" : "  ".repeat(n);
    while((m = re.exec(html)) !== null){
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/forge/linter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Linter — checks bio HTML against JanitorAI sanitizer rules and "house doctrine".
 *
 * Returns a list of problems (empty = clean).
 *
 * BUGFIX vs original:
 *  - The position: regex now uses a negative lookbehind for `-` so it does NOT
 *    match `background-position:` (the original relied on a `[;"'\s]` prefix
 *    which failed for `transition:position` and similar edge cases).
 */ __turbopack_context__.s([
    "lint",
    ()=>lint
]);
function lint(html) {
    const problems = [];
    if (/<style[\s>]/i.test(html)) {
        problems.push({
            message: "<style> — stripped by server.",
            severity: "error"
        });
    }
    if (/<script[\s>]/i.test(html)) {
        problems.push({
            message: "<script> — stripped by server.",
            severity: "error"
        });
    }
    // BUGFIX: negative lookbehind for `-` prevents matching `background-position:`
    if (RegExp("(?<![a-z-])position\\s*:", "i").test(html)) {
        problems.push({
            message: "position: — stripped.",
            severity: "error"
        });
    }
    if (/z-index/i.test(html)) {
        problems.push({
            message: "z-index — stripped badly.",
            severity: "error"
        });
    }
    if (/width\s*:\s*100vw/i.test(html)) {
        problems.push({
            message: "width:100vw — overflow risk.",
            severity: "warning"
        });
    }
    const o = (html.match(/<div/g) || []).length;
    const c = (html.match(/<\/div>/g) || []).length;
    if (o !== c) {
        problems.push({
            message: `Unbalanced <div>: ${o} open, ${c} close.`,
            severity: "error"
        });
    }
    const p = (html.match(/<p[\s>]/g) || []).length;
    const pc = (html.match(/<\/p>/g) || []).length;
    if (p !== pc) {
        problems.push({
            message: `Unbalanced <p>: ${p} open, ${pc} close.`,
            severity: "error"
        });
    }
    if (html.length > 3000) {
        const gridRe = /grid-template-columns\s*:\s*([^;"]+)/g;
        let g;
        let fixedGrids = 0;
        while((g = gridRe.exec(html)) !== null){
            if (g[1].indexOf("auto-fit") === -1 && g[1].indexOf("auto-fill") === -1) {
                fixedGrids++;
            }
        }
        if (fixedGrids > 0) {
            problems.push({
                message: `${fixedGrids} fixed grid(s) — not responsive.`,
                severity: "warning"
            });
        }
    }
    return problems;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/forge/colorUtils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Color utilities — ported from BioForge index.html with stricter typing.
 * Handles hex3, hex6, rgb(), and rgba() parsing/serialization.
 */ __turbopack_context__.s([
    "luminance",
    ()=>luminance,
    "parseColor",
    ()=>parseColor,
    "toCss",
    ()=>toCss
]);
const HEX3_RE = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;
const HEX6_RE = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
const RGBA_RE = /^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\s*\)$/i;
function parseColor(c) {
    if (!c) return null;
    const s = c.trim();
    let m = HEX3_RE.exec(s);
    if (m) {
        return [
            parseInt(m[1] + m[1], 16),
            parseInt(m[2] + m[2], 16),
            parseInt(m[3] + m[3], 16)
        ];
    }
    m = HEX6_RE.exec(s);
    if (m) {
        return [
            parseInt(m[1], 16),
            parseInt(m[2], 16),
            parseInt(m[3], 16)
        ];
    }
    m = RGBA_RE.exec(s);
    if (m) {
        return [
            +m[1],
            +m[2],
            +m[3],
            m[4] !== undefined ? parseFloat(m[4]) : 1
        ];
    }
    return null;
}
function toCss(rgb) {
    if (rgb.length === 4 && rgb[3] < 1) {
        return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${rgb[3]})`;
    }
    const h = (n)=>{
        const s = n.toString(16);
        return s.length === 1 ? "0" + s : s;
    };
    return `#${h(rgb[0])}${h(rgb[1])}${h(rgb[2])}`;
}
function luminance(rgb) {
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/forge/themes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "THEMES",
    ()=>THEMES,
    "applyThemeToHtml",
    ()=>applyThemeToHtml
]);
/**
 * Bio theme re-skinning.
 *
 * Remaps colors in a bio HTML string to one of four preset palettes.
 * Preserves alpha, avoids HTML entities, and separates headline vs body colors.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/colorUtils.ts [app-client] (ecmascript)");
;
const THEMES = {
    gothic: {
        bg: "#0d0e14",
        headline: "#d6e0fa",
        body: "#b9b3ad",
        soft: "#9ab0d2",
        gold: "#d4af55",
        goldtext: "#e8cd8c"
    },
    gold: {
        bg: "#0b0a08",
        headline: "#f0e6c8",
        body: "#cfc4a8",
        soft: "#c9a84c",
        gold: "#c9a84c",
        goldtext: "#e8d5a0"
    },
    ember: {
        bg: "#120c0a",
        headline: "#ece2dc",
        body: "#d8ccc4",
        soft: "#eb826e",
        gold: "#c9a84c",
        goldtext: "#e8d5a0"
    },
    minimal: {
        bg: "#0a0a0d",
        headline: "#f4f8ff",
        body: "#c2c9d4",
        soft: "#9ab0d2",
        gold: "#c9a84c",
        goldtext: "#e8d5a0"
    }
};
function applyThemeToHtml(html, name) {
    const T = THEMES[name];
    if (!T) return null;
    // Re-skin the wrapper background-color
    const wrapperRe = /(<div\s+style="[^"]*?(?:^|;)\s*background-color\s*:\s*)(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))/;
    if (wrapperRe.test(html)) {
        html = html.replace(wrapperRe, (_all, pre, color)=>{
            const rgb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])(color);
            return pre + (rgb ? T.bg : color);
        });
    }
    // Scan for headline colors (spans with font-size >= 1.3rem)
    const colors = {};
    const headlineColors = {};
    const spanRe = /(<span[^>]*font-size\s*:\s*([\d.]+)rem[^>]*>)([\s\S]*?)<\/span>/g;
    let sm;
    while((sm = spanRe.exec(html)) !== null){
        if (parseFloat(sm[2]) >= 1.3) {
            const cRe = /(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgba?\([^)]*\))/g;
            let cm3;
            const both = sm[1] + sm[3];
            while((cm3 = cRe.exec(both)) !== null){
                headlineColors[cm3[1].toLowerCase()] = true;
            }
        }
    }
    // Count all colors
    const allRe = /(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgba?\([^)]*\))/g;
    let am;
    while((am = allRe.exec(html)) !== null){
        const key = am[1].toLowerCase();
        if (!colors[key]) colors[key] = {
            count: 0
        };
        colors[key].count++;
    }
    // Pick body & soft colors (non-headline, mid-luminance, by frequency)
    const candidates = Object.keys(colors).map((k)=>{
        const rgb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])(k);
        const lum = rgb ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["luminance"])(rgb) : -1;
        return {
            k,
            count: colors[k].count,
            lum,
            isHead: !!headlineColors[k]
        };
    }).filter((c)=>c.lum >= 60 && c.lum <= 220);
    candidates.sort((a, b)=>b.count - a.count);
    let bodyColor = null;
    let softColor = null;
    for (const c of candidates){
        if (!c.isHead && !bodyColor) bodyColor = c.k;
        else if (!c.isHead && bodyColor && c.k !== bodyColor && !softColor) {
            softColor = c.k;
        }
    }
    const map = {};
    if (bodyColor) map[bodyColor] = T.body;
    if (softColor) map[softColor] = T.soft;
    Object.keys(headlineColors).forEach((hc)=>{
        map[hc] = T.headline;
    });
    candidates.forEach((c)=>{
        if (!map[c.k] && c.lum > 120) {
            const rgb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])(c.k);
            if (rgb && rgb[0] > rgb[2]) map[c.k] = T.gold;
        }
    });
    html = html.replace(/(#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|rgba?\([^)]*\))/g, (match, offset, str)=>{
        // Skip HTML entities like &#9670;
        if (offset > 0 && str.charAt(offset - 1) === "&") return match;
        if (offset > 0 && /[&\w]/.test(str.charAt(offset - 1))) return match;
        const k = match.toLowerCase();
        const newColor = map[k];
        if (!newColor) return match;
        const oldRgb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])(match);
        const newRgb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])(newColor);
        if (oldRgb && newRgb && oldRgb.length === 4) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toCss"])([
                newRgb[0],
                newRgb[1],
                newRgb[2],
                oldRgb[3]
            ]);
        }
        return newColor;
    });
    return {
        html,
        remappedCount: Object.keys(map).length,
        themeName: name
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/forge/diff.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Diff utility — highlights lines in the editor that are added/changed vs live.
 * (Deletions are not shown — the original design choice, preserved here.)
 */ __turbopack_context__.s([
    "computeDiff",
    ()=>computeDiff
]);
function computeDiff(mineHtml, liveHtml) {
    const mineLines = mineHtml.split("\n");
    const liveSet = new Set();
    liveHtml.split("\n").forEach((l)=>liveSet.add(l.trim()));
    const addedLines = [];
    mineLines.forEach((l, i)=>{
        if (l.trim() && !liveSet.has(l.trim())) addedLines.push(i);
    });
    return {
        addedLines,
        addedCount: addedLines.length
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/forge/blockMapper.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Block Mapper v5 — depth-aware HTML section parser.
 *
 * Parses an HTML source string and identifies "blocks" (top-level elements and
 * nested sections) so the editor can map preview clicks back to source lines.
 *
 * House format: wrapper > max-width container > sections (depth 2).
 */ __turbopack_context__.s([
    "buildBlockMap",
    ()=>buildBlockMap,
    "getJumpList",
    ()=>getJumpList,
    "jumpCount",
    ()=>jumpCount,
    "jumpLine",
    ()=>jumpLine
]);
const VOID_TAGS = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
]);
const OPTIONAL_END = new Set([
    "p",
    "li",
    "dt",
    "dd",
    "option",
    "td",
    "th",
    "tr"
]);
function buildBlockMap(source) {
    const top = [];
    const sub = [];
    let stack = [];
    let topCount = 0;
    let inFirstWrapper = false;
    let i = 0;
    const len = source.length;
    // Pre-compute newline offsets for binary search line lookup
    const newlines = [];
    for(let k = 0; k < len; k++){
        if (source.charAt(k) === "\n") newlines.push(k);
    }
    function lineAt(offset) {
        let lo = 0, hi = newlines.length;
        while(lo < hi){
            const mid = lo + hi >> 1;
            if (newlines[mid] < offset) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
    while(i < len){
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
                let quote = null;
                while(j < len){
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
                    for(let s = stack.length - 1; s >= 0; s--){
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
                    top.push({
                        line: lineAt(i),
                        tag: name
                    });
                    topCount++;
                    inFirstWrapper = topCount === 1;
                } else if (stack.length === 1 && inFirstWrapper) {
                    sub.push({
                        line: lineAt(i),
                        depth: 1,
                        tag: name
                    });
                } else if (stack.length === 2 && inFirstWrapper) {
                    sub.push({
                        line: lineAt(i),
                        depth: 2,
                        tag: name
                    });
                }
                if (!selfClose) stack.push(name);
                i = j + 1;
                continue;
            }
        }
        i++;
    }
    return {
        top,
        sub
    };
}
function getJumpList(src) {
    const m = buildBlockMap(src);
    if (m.top.length !== 1) return m.top;
    const d1 = m.sub.filter((s)=>s.depth === 1);
    const d2 = m.sub.filter((s)=>s.depth === 2);
    // House format: wrapper > single container div > sections at depth 2
    if (d1.length === 1 && d1[0].tag === "div" && d2.length >= 1) {
        return [
            m.top[0],
            ...d2
        ];
    }
    return [
        m.top[0],
        ...d1.length ? d1 : m.sub
    ];
}
function jumpLine(index, src) {
    const jl = getJumpList(src);
    if (index < 0 || index >= jl.length) return -1;
    return jl[index].line;
}
function jumpCount(src) {
    return getJumpList(src).length;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/forge/selfTest.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runSelfTest",
    ()=>runSelfTest
]);
/**
 * Self-Test suite — known-answer tests for the block mapper, color parser,
 * formatter, and live editor state. Ported from the original v7 suite.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/blockMapper.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/colorUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$formatter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/formatter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/themes.ts [app-client] (ecmascript)");
;
;
;
;
function runSelfTest(opts) {
    const results = [];
    let group = "";
    const setGroup = (g)=>{
        group = g;
    };
    const check = (name, pass, detail = "")=>{
        results.push({
            group,
            name,
            pass: !!pass,
            detail
        });
    };
    // ===== Mapper — known-answer documents =====
    setGroup("Mapper — known-answer documents");
    const docA = '<div a>\ntext\n</div>\n<p>one</p>\n<div b>\n<div>nested</div>\n</div>';
    const mA = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBlockMap"])(docA);
    check("A: 3 top-level blocks", mA.top.length === 3, "found " + mA.top.length);
    check("A: block 2 (<p>) at line 3", !!mA.top[1] && mA.top[1].line === 3, "got " + (mA.top[1]?.line ?? "?"));
    check("A: block 3 at line 4", !!mA.top[2] && mA.top[2].line === 4, "got " + (mA.top[2]?.line ?? "?"));
    const docB = '<div\nstyle="color:red;">\ntext\n</div>\n<div>two</div>';
    const mB = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBlockMap"])(docB);
    check("B: multi-line tag at line 0", mB.top.length === 2 && mB.top[0].line === 0, "blocks=" + mB.top.length + " line0=" + (mB.top[0]?.line ?? "?"));
    check("B: second block at line 4", !!mB.top[1] && mB.top[1].line === 4, "got " + (mB.top[1]?.line ?? "?"));
    const docC = '<!-- note -->\n<div>x</div>';
    const mC = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBlockMap"])(docC);
    check("C: comment NOT counted (1 block)", mC.top.length === 1, "found " + mC.top.length);
    check("C: div at line 1", !!mC.top[0] && mC.top[0].line === 1, "got " + (mC.top[0]?.line ?? "?"));
    const docD = '<div>\n<img src="x"><br>\n<hr>\n</div>\n<div>y</div>';
    const mD = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBlockMap"])(docD);
    check("D: void tags, 2 top blocks", mD.top.length === 2, "found " + mD.top.length);
    const docE = '<div title="a > b">\ntext\n</div>\n<div>z</div>';
    const mE = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBlockMap"])(docE);
    check('E: quoted ">", 2 top blocks', mE.top.length === 2, "found " + mE.top.length);
    const docF = '<div wrap>\n<div a>x</div>\n<p>b</p>\n<div c>\n<div>deep</div>\n</div>\n</div>';
    const mF = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBlockMap"])(docF);
    check("F: single wrapper detected", mF.top.length === 1, "top=" + mF.top.length);
    const jlF = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJumpList"])(docF);
    check("F: jump list = wrapper + 3 sections (4)", jlF.length === 4, "jumpList=" + jlF.length);
    // Doc G: the actual house format
    const docG = '<div bg>\n<div container>\n<div a>x</div>\n<p>b</p>\n<div c>y</div>\n</div>\n</div>';
    const jlG = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJumpList"])(docG);
    check("G: two-wrapper house format, sections at depth 2", jlG.length === 4 && jlG[1].line === 2 && jlG[2].line === 3 && jlG[3].line === 4, "jumpList=" + jlG.length + " lines=" + jlG.map((j)=>j.line).join(","));
    // ===== Real Content — actual editor state =====
    setGroup("Real Content — actual editor state");
    const realHtml = opts.editorHtml;
    const hasReal = realHtml.trim().length > 0;
    check("Editor has content to test", hasReal, "editor empty — paste a bio, refresh, re-test");
    if (hasReal) {
        const realMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBlockMap"])(realHtml);
        const realJumps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJumpList"])(realHtml);
        const realLines = realHtml.split("\n").length;
        check("Mapper finds top-level elements", realMap.top.length >= 1, "top=" + realMap.top.length);
        check("Jump list has more than 1 entry (sections detected)", realJumps.length > 1, "jumpList=" + realJumps.length + " — if 1, mapper sees only the wrapper");
        let allLinesValid = true;
        let badLine = "";
        for(let ji = 0; ji < realJumps.length; ji++){
            if (realJumps[ji].line < 0 || realJumps[ji].line >= realLines) {
                allLinesValid = false;
                badLine = "jump[" + ji + "]=line " + realJumps[ji].line + " (editor has " + realLines + " lines)";
                break;
            }
        }
        check("All jump lines valid", allLinesValid, badLine);
        let ordered = true;
        let bad = -1;
        for(let jo = 1; jo < realJumps.length; jo++){
            if (realJumps[jo].line < realJumps[jo - 1].line) {
                ordered = false;
                bad = jo;
                break;
            }
        }
        check("Jump lines in document order", ordered, ordered ? "" : "jump[" + bad + "]=line " + realJumps[bad].line + " < line " + realJumps[bad - 1].line);
        if (opts.previewAccessible) {
            check("Preview sections labeled (data-forge-idx)", opts.previewLabeledCount > 0, "found " + opts.previewLabeledCount + " — if 0, click Refresh Preview and re-test");
            check("Labeled count matches jump list", opts.previewLabeledCount === realJumps.length, "labeled=" + opts.previewLabeledCount + " / jumpList=" + realJumps.length);
            check("Click handler attached", opts.previewWired === true, "wirePreviewClicks did not set __forgeWired — Refresh Preview, re-test");
        } else {
            check("Preview accessible", false, "iframe not reachable — Refresh Preview, re-test");
        }
        const jumpLines = realJumps.map((j)=>j.line).join(",");
        check("DIAGNOSTIC: jump list summary", true, realJumps.length + " sections at lines [" + (jumpLines.length > 80 ? jumpLines.substring(0, 80) + "..." : jumpLines) + "]");
    }
    // ===== System =====
    setGroup("System");
    check("All four themes defined", !!(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEMES"].gothic && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEMES"].gold && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEMES"].ember && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEMES"].minimal), "missing theme");
    const testKey = "forge-st-" + Date.now();
    try {
        localStorage.setItem(testKey, "1");
        localStorage.removeItem(testKey);
        check("Vault writable", true);
    } catch (e) {
        check("Vault writable", false, e instanceof Error ? e.message : String(e));
    }
    const pc1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])("#ff0000");
    const pc2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])("rgb(1, 2, 3)");
    const pc3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])("#abc");
    const pc4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])("rgba(1,2,3,0.5)");
    check("Color parser: hex6 / rgb / hex3 / rgba-with-alpha", !!pc1 && pc1[0] === 255 && !!pc2 && pc2[1] === 2 && !!pc3 && pc3[0] === 170 && !!pc4 && pc4.length === 4 && pc4[3] === 0.5, "parsed " + JSON.stringify([
        pc1,
        pc2,
        pc3,
        pc4
    ]));
    const beforeJumps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jumpCount"])(opts.editorHtml);
    const formattedNow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$formatter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatSource"])(opts.editorHtml);
    const afterJumps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJumpList"])(formattedNow).length;
    check("Format preserves section count", beforeJumps === afterJumps, "before " + beforeJumps + " / after " + afterJumps);
    const entityDoc = "<div>&#9670; &#128302;</div>";
    const fmtEntity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$formatter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatSource"])(entityDoc);
    check("Format preserves numeric entities", fmtEntity.indexOf("&#9670;") !== -1 && fmtEntity.indexOf("&#128302;") !== -1, "entities corrupted: " + fmtEntity);
    // ===== Build report =====
    const passed = results.filter((r)=>r.pass).length;
    const lines = [
        `FORGE SELF-TEST v8 — ${passed}/${results.length} passed`,
        ""
    ];
    let cg = "";
    for (const r of results){
        if (r.group !== cg) {
            cg = r.group;
            lines.push("", "### " + r.group);
        }
        lines.push(`${r.pass ? "PASS" : "FAIL"} — ${r.name}${r.detail ? "  (" + r.detail + ")" : ""}`);
    }
    lines.push("", passed === results.length ? "ALL SYSTEMS NOMINAL" : "FAILURES DETECTED — see details above.");
    return {
        results,
        passed,
        total: results.length,
        allNominal: passed === results.length,
        text: lines.join("\n")
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Textarea({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        "data-slot": "textarea",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/textarea.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Textarea;
;
var _c;
__turbopack_context__.k.register(_c, "Textarea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/dialogs/DiffDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DiffDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$compare$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitCompare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-compare.js [app-client] (ecmascript) <export default as GitCompare>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function DiffDialog({ open, onOpenChange, onRunDiff }) {
    _s();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleRun = ()=>{
        onRunDiff(text);
        onOpenChange(false);
    };
    const handleCopy = async ()=>{
        try {
            await navigator.clipboard.writeText(text);
        } catch  {
        // ignore
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-2xl",
            style: {
                background: "var(--forge-panel)",
                color: "var(--forge-text)",
                border: "1px solid var(--forge-edge)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "flex items-center gap-2",
                        style: {
                            color: "var(--forge-accent2)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$compare$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitCompare$3e$__["GitCompare"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/dialogs/DiffDialog.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            " Compare with Live"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/dialogs/DiffDialog.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/DiffDialog.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: "var(--forge-dim)",
                        fontSize: 13,
                        lineHeight: 1.6
                    },
                    children: "Run the fetch script (Load Current) on a janitorai.com tab, copy the content between the markers, paste below."
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/DiffDialog.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                    value: text,
                    onChange: (e)=>setText(e.target.value),
                    placeholder: "Paste the LIVE bio content here...",
                    className: "min-h-[180px] font-mono text-xs",
                    style: {
                        background: "var(--forge-panel2)",
                        color: "var(--forge-text)",
                        border: "1px solid var(--forge-edge)"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/DiffDialog.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: handleCopy,
                            type: "button",
                            children: "Copy"
                        }, void 0, false, {
                            fileName: "[project]/src/components/forge/dialogs/DiffDialog.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleRun,
                            type: "button",
                            children: "Show Changes"
                        }, void 0, false, {
                            fileName: "[project]/src/components/forge/dialogs/DiffDialog.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/forge/dialogs/DiffDialog.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/forge/dialogs/DiffDialog.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/forge/dialogs/DiffDialog.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(DiffDialog, "3t0DFnMi16eB/7p7iIKtjG5r68g=");
_c = DiffDialog;
var _c;
__turbopack_context__.k.register(_c, "DiffDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/dialogs/SelfTestDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SelfTestDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bug$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bug$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bug.js [app-client] (ecmascript) <export default as Bug>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
"use client";
;
;
;
;
;
function SelfTestDialog({ open, onOpenChange, report }) {
    if (!report) return null;
    const handleCopy = async ()=>{
        try {
            await navigator.clipboard.writeText(report.text);
        } catch  {
        // ignore
        }
    };
    // Precompute which result indices start a new group
    const groupStarts = new Set();
    report.results.forEach((r, i)=>{
        if (i === 0 || r.group !== report.results[i - 1].group) {
            groupStarts.add(i);
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-2xl",
            style: {
                background: "var(--forge-panel)",
                color: "var(--forge-text)",
                border: "1px solid var(--forge-edge)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "flex items-center gap-2",
                        style: {
                            color: "var(--forge-accent2)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bug$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bug$3e$__["Bug"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            " Self-Test Report"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                    className: "max-h-[60vh]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "0 4px"
                        },
                        children: report.results.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    groupStarts.has(i) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "st-group",
                                        children: r.group
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                                        lineNumber: 60,
                                        columnNumber: 40
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "st-line",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: r.pass ? "st-pass" : "st-fail",
                                                children: r.pass ? "✓ PASS" : "✗ FAIL"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                                                lineNumber: 62,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: r.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                                                lineNumber: 65,
                                                columnNumber: 19
                                            }, this),
                                            r.detail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "st-detail",
                                                children: [
                                                    "(",
                                                    r.detail,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                                                lineNumber: 66,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                                        lineNumber: 61,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "st-summary",
                    style: {
                        color: report.allNominal ? "var(--forge-ok)" : "var(--forge-bad)"
                    },
                    children: [
                        report.passed,
                        " / ",
                        report.total,
                        " passed —",
                        " ",
                        report.allNominal ? "all systems nominal." : "failures detected, see above."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        onClick: handleCopy,
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            " Copy Report"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/forge/dialogs/SelfTestDialog.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = SelfTestDialog;
var _c;
__turbopack_context__.k.register(_c, "SelfTestDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/dialogs/ScriptDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScriptDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/forge/useForge.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ScriptDialog({ open, onOpenChange, title, note, body }) {
    _s();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "ScriptDialog.useForge[toast]": (s)=>s.toast
    }["ScriptDialog.useForge[toast]"]);
    const handleCopy = async ()=>{
        try {
            await navigator.clipboard.writeText(body);
            toast("Copied — paste into JAI console (F12).", "ok");
        } catch  {
            // Fallback
            const ta = document.createElement("textarea");
            ta.value = body;
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand("copy");
                toast("Copied — paste into JAI console (F12).", "ok");
            } catch  {
                toast("Copy failed — select the text manually.", "error");
            }
            ta.remove();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-2xl",
            style: {
                background: "var(--forge-panel)",
                color: "var(--forge-text)",
                border: "1px solid var(--forge-edge)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        style: {
                            color: "var(--forge-accent2)"
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/dialogs/ScriptDialog.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/ScriptDialog.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: "var(--forge-dim)",
                        fontSize: 13,
                        lineHeight: 1.6
                    },
                    children: note
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/ScriptDialog.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                    className: "max-h-[50vh] rounded-md",
                    style: {
                        background: "rgba(8,7,12,0.85)",
                        border: "1px solid var(--forge-edge)"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        style: {
                            padding: 10,
                            fontSize: 11,
                            color: "var(--forge-gold)",
                            whiteSpace: "pre",
                            fontFamily: "Consolas, monospace",
                            margin: 0
                        },
                        children: body
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/dialogs/ScriptDialog.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/ScriptDialog.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleCopy,
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/dialogs/ScriptDialog.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            " Copy Script"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/dialogs/ScriptDialog.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/dialogs/ScriptDialog.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/forge/dialogs/ScriptDialog.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/forge/dialogs/ScriptDialog.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(ScriptDialog, "LSfIGDAGSnjJpaRNf70+scJECtI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"]
    ];
});
_c = ScriptDialog;
var _c;
__turbopack_context__.k.register(_c, "ScriptDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/Toolbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Toolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/forge/useForge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$formatter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/formatter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$linter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/linter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/themes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$publisher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/publisher.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$diff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/diff.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$selfTest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/selfTest.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$compare$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitCompare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-compare.js [app-client] (ecmascript) <export default as GitCompare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bug$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bug$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bug.js [app-client] (ecmascript) <export default as Bug>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wand-sparkles.js [app-client] (ecmascript) <export default as Wand2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$dialogs$2f$DiffDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forge/dialogs/DiffDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$dialogs$2f$SelfTestDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forge/dialogs/SelfTestDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$dialogs$2f$ScriptDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forge/dialogs/ScriptDialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function Toolbar({ onOpenAbout, onOpenToken }) {
    _s();
    const htmlContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "Toolbar.useForge[htmlContent]": (s)=>s.html
    }["Toolbar.useForge[htmlContent]"]);
    const setHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "Toolbar.useForge[setHtml]": (s)=>s.setHtml
    }["Toolbar.useForge[setHtml]"]);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "Toolbar.useForge[toast]": (s)=>s.toast
    }["Toolbar.useForge[toast]"]);
    const refreshPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "Toolbar.useForge[refreshPreview]": (s)=>s.refreshPreview
    }["Toolbar.useForge[refreshPreview]"]);
    const clearDiff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "Toolbar.useForge[clearDiff]": (s)=>s.clearDiff
    }["Toolbar.useForge[clearDiff]"]);
    const setDiffLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "Toolbar.useForge[setDiffLines]": (s)=>s.setDiffLines
    }["Toolbar.useForge[setDiffLines]"]);
    const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "Toolbar.useForge[meta]": (s)=>s.meta
    }["Toolbar.useForge[meta]"]);
    const setMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "Toolbar.useForge[setMeta]": (s)=>s.setMeta
    }["Toolbar.useForge[setMeta]"]);
    const previewLabeledCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "Toolbar.useForge[previewLabeledCount]": (s)=>s.previewLabeledCount
    }["Toolbar.useForge[previewLabeledCount]"]);
    const previewWired = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "Toolbar.useForge[previewWired]": (s)=>s.previewWired
    }["Toolbar.useForge[previewWired]"]);
    const previewAccessible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "Toolbar.useForge[previewAccessible]": (s)=>s.previewAccessible
    }["Toolbar.useForge[previewAccessible]"]);
    const [diffOpen, setDiffOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selfTestOpen, setSelfTestOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selfTestReport, setSelfTestReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [scriptOpen, setScriptOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scriptState, setScriptState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: "",
        note: "",
        body: ""
    });
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [publishing, setPublishing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleFormat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Toolbar.useCallback[handleFormat]": ()=>{
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$formatter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatSource"])(htmlContent);
            if (result === htmlContent) {
                toast("Already formatted.", "ok");
                return;
            }
            setHtml(result);
            toast("Formatted (block-level only — inline tags preserved inline).", "ok");
        }
    }["Toolbar.useCallback[handleFormat]"], [
        htmlContent,
        setHtml,
        toast
    ]);
    const handleLint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Toolbar.useCallback[handleLint]": ()=>{
            const problems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$linter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lint"])(htmlContent);
            if (problems.length === 0) {
                toast("Lint clean — sanitizer rules and house doctrine both pass.", "ok");
            } else {
                toast(`Lint found ${problems.length} issue(s):`, "error", problems.map({
                    "Toolbar.useCallback[handleLint]": (p)=>`[${p.severity}] ${p.message}`
                }["Toolbar.useCallback[handleLint]"]).join("\n"), true);
            }
        }
    }["Toolbar.useCallback[handleLint]"], [
        htmlContent,
        toast
    ]);
    const handleClear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Toolbar.useCallback[handleClear]": ()=>{
            if (htmlContent.trim()) {
                if (!window.confirm("Clear the editor? The vault keeps the last saved copy.")) {
                    return;
                }
            }
            setHtml("");
            refreshPreview();
            toast("Editor cleared.", "ok");
        }
    }["Toolbar.useCallback[handleClear]"], [
        htmlContent,
        setHtml,
        refreshPreview,
        toast
    ]);
    const handleExport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Toolbar.useCallback[handleExport]": ()=>{
            if (!htmlContent.trim()) {
                toast("Editor is empty — nothing to export.", "error");
                return;
            }
            const blob = new Blob([
                htmlContent
            ], {
                type: "text/html"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
            a.download = `forge-bio-${stamp}.html`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            toast("Exported as standalone HTML file.", "ok");
        }
    }["Toolbar.useCallback[handleExport]"], [
        htmlContent,
        toast
    ]);
    const handleImportClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Toolbar.useCallback[handleImportClick]": ()=>{
            fileInputRef.current?.click();
        }
    }["Toolbar.useCallback[handleImportClick]"], []);
    const handleImportFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Toolbar.useCallback[handleImportFile]": (e)=>{
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ({
                "Toolbar.useCallback[handleImportFile]": ()=>{
                    const text = String(reader.result ?? "");
                    setHtml(text);
                    toast(`Imported "${file.name}" (${text.length.toLocaleString()} chars).`, "ok");
                }
            })["Toolbar.useCallback[handleImportFile]"];
            reader.onerror = ({
                "Toolbar.useCallback[handleImportFile]": ()=>toast("Failed to read file.", "error")
            })["Toolbar.useCallback[handleImportFile]"];
            reader.readAsText(file);
            e.target.value = "";
        }
    }["Toolbar.useCallback[handleImportFile]"], [
        setHtml,
        toast
    ]);
    const handleLoadCurrent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Toolbar.useCallback[handleLoadCurrent]": ()=>{
            const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$publisher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTarget"])(meta.target);
            if (!t) {
                toast("Target URL has no UUID.", "error");
                return;
            }
            if (!meta.token.trim()) {
                toast("Paste your token first.", "error");
                return;
            }
            const script = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$publisher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildLoadScript"])(t, meta.token.trim());
            setScriptState({
                title: "Load Current (for Compare)",
                note: "Run on any janitorai.com tab. Copy between the markers, then close this dialog.",
                body: script
            });
            setScriptOpen(true);
        // After the user closes the script dialog, open the diff dialog
        }
    }["Toolbar.useCallback[handleLoadCurrent]"], [
        meta.target,
        meta.token,
        toast
    ]);
    const handleRunDiff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Toolbar.useCallback[handleRunDiff]": (liveText)=>{
            const live = liveText.trim();
            if (!live) {
                toast("Paste the live bio content first.", "error");
                return;
            }
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$diff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeDiff"])(htmlContent, live);
            setDiffLines(result.addedLines);
            toast(`${result.addedCount} line(s) highlighted (added/changed — deletions not shown). Editing or Refresh clears.`, result.addedCount ? "ok" : "note");
        }
    }["Toolbar.useCallback[handleRunDiff]"], [
        htmlContent,
        setDiffLines,
        toast
    ]);
    const handleSelfTest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Toolbar.useCallback[handleSelfTest]": ()=>{
            const report = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$selfTest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runSelfTest"])({
                editorHtml: htmlContent,
                previewLabeledCount,
                previewWired,
                previewAccessible
            });
            setSelfTestReport(report);
            setSelfTestOpen(true);
            toast(report.allNominal ? `Self-Test: ${report.passed}/${report.total} — all nominal.` : `Self-Test: ${report.total - report.passed} FAILURE(S) — panel open.`, report.allNominal ? "ok" : "error");
        }
    }["Toolbar.useCallback[handleSelfTest]"], [
        htmlContent,
        previewLabeledCount,
        previewWired,
        previewAccessible,
        toast
    ]);
    const handlePublish = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Toolbar.useCallback[handlePublish]": async ()=>{
            const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$publisher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTarget"])(meta.target);
            if (!t) {
                toast("Target URL has no character/script UUID.", "error");
                return;
            }
            if (!meta.token.trim()) {
                toast("Paste your access token first.", "error");
                return;
            }
            if (!htmlContent.trim()) {
                toast("Editor is empty.", "error");
                return;
            }
            if (/z-index/i.test(htmlContent)) {
                toast("HTML contains z-index — remove it first.", "error");
                return;
            }
            setPublishing(true);
            try {
                // Publish via a Next.js API route (proxy) to avoid CORS.
                const res = await fetch("/api/forge/publish?XTransformPort=3000", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        url: meta.target.trim(),
                        token: meta.token.trim(),
                        html: htmlContent
                    })
                });
                const data = await res.json().catch({
                    "Toolbar.useCallback[handlePublish]": ()=>({
                            ok: false,
                            status: res.status,
                            response: "Unparseable response"
                        })
                }["Toolbar.useCallback[handlePublish]"]);
                if (data.ok) {
                    toast(`Published (${data.target || "ok"}). Open the page to verify.`, "ok");
                } else {
                    toast(`JAI rejected the publish (${data.status || res.status}).`, "error", JSON.stringify(data.response || data.error || data).slice(0, 600), true);
                }
            } catch (e) {
                toast("Could not reach the publish proxy: " + (e instanceof Error ? e.message : String(e)), "error", undefined, true);
            } finally{
                setPublishing(false);
            }
        }
    }["Toolbar.useCallback[handlePublish]"], [
        meta.target,
        meta.token,
        htmlContent,
        toast
    ]);
    // Listen for keyboard shortcut events dispatched by ForgeApp
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toolbar.useEffect": ()=>{
            const onFormat = {
                "Toolbar.useEffect.onFormat": ()=>handleFormat()
            }["Toolbar.useEffect.onFormat"];
            const onLint = {
                "Toolbar.useEffect.onLint": ()=>handleLint()
            }["Toolbar.useEffect.onLint"];
            const onPublish = {
                "Toolbar.useEffect.onPublish": ()=>handlePublish()
            }["Toolbar.useEffect.onPublish"];
            document.addEventListener("forge:format", onFormat);
            document.addEventListener("forge:lint", onLint);
            document.addEventListener("forge:publish", onPublish);
            return ({
                "Toolbar.useEffect": ()=>{
                    document.removeEventListener("forge:format", onFormat);
                    document.removeEventListener("forge:lint", onLint);
                    document.removeEventListener("forge:publish", onPublish);
                }
            })["Toolbar.useEffect"];
        }
    }["Toolbar.useEffect"], [
        handleFormat,
        handleLint,
        handlePublish
    ]);
    const handleApplyTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Toolbar.useCallback[handleApplyTheme]": (name)=>{
            if (!name) {
                toast("Theme cleared — nothing changed.", "ok");
                return;
            }
            if (!htmlContent.trim()) {
                toast("Editor is empty — paste a bio first.", "error");
                return;
            }
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyThemeToHtml"])(htmlContent, name);
            if (!result) {
                toast("Unknown theme.", "error");
                return;
            }
            setHtml(result.html);
            toast(`Re-skinned: ${name}. ${result.remappedCount} color slots remapped. Ctrl+Z reverts.`, "ok");
        }
    }["Toolbar.useCallback[handleApplyTheme]"], [
        htmlContent,
        setHtml,
        toast
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "forge-row",
                style: {
                    marginTop: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: handleFormat,
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__["Wand2"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 296,
                                columnNumber: 11
                            }, this),
                            " Format"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: handleLint,
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, this),
                            " Lint"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: handleLoadCurrent,
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this),
                            " Load Current"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: ()=>{
                            refreshPreview();
                            clearDiff();
                            toast("Preview reloaded fresh.", "ok");
                        },
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 313,
                                columnNumber: 11
                            }, this),
                            " Refresh Preview"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: ()=>setDiffOpen(true),
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$compare$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitCompare$3e$__["GitCompare"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this),
                            " Compare"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: handleSelfTest,
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bug$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bug$3e$__["Bug"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, this),
                            " Self-Test"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: handleClear,
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, this),
                            " Clear"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: handleExport,
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this),
                            " Export"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ghost",
                        onClick: handleImportClick,
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 333,
                                columnNumber: 11
                            }, this),
                            " Import"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileInputRef,
                        type: "file",
                        accept: ".html,.htm,.txt",
                        onChange: handleImportFile,
                        style: {
                            display: "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "forge-spacer"
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "forge-select",
                        style: {
                            flex: "0 1 180px"
                        },
                        value: "",
                        onChange: (e)=>{
                            if (e.target.value) handleApplyTheme(e.target.value);
                            e.target.value = "";
                        },
                        "aria-label": "Apply bio theme",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "✨ Apply theme…"
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "gothic",
                                children: "Gothic Steel"
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 354,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "gold",
                                children: "Gold Obsidian"
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 355,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "ember",
                                children: "Dossier Ember"
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "minimal",
                                children: "Minimal Ephemera"
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 357,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 343,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "forge-btn ember",
                        onClick: handlePublish,
                        disabled: publishing,
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/Toolbar.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this),
                            " ",
                            publishing ? "Publishing..." : "Publish"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/Toolbar.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/forge/Toolbar.tsx",
                lineNumber: 294,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$dialogs$2f$DiffDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: diffOpen,
                onOpenChange: setDiffOpen,
                onRunDiff: handleRunDiff
            }, void 0, false, {
                fileName: "[project]/src/components/forge/Toolbar.tsx",
                lineNumber: 364,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$dialogs$2f$SelfTestDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: selfTestOpen,
                onOpenChange: setSelfTestOpen,
                report: selfTestReport
            }, void 0, false, {
                fileName: "[project]/src/components/forge/Toolbar.tsx",
                lineNumber: 369,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$dialogs$2f$ScriptDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: scriptOpen,
                onOpenChange: (o)=>{
                    setScriptOpen(o);
                    if (!o) setDiffOpen(true);
                },
                title: scriptState.title,
                note: scriptState.note,
                body: scriptState.body
            }, void 0, false, {
                fileName: "[project]/src/components/forge/Toolbar.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Toolbar, "mt3Tbkr67iulG9tnmk9ihx2L3bA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"]
    ];
});
_c = Toolbar;
var _c;
__turbopack_context__.k.register(_c, "Toolbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/CodeEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CodeEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/forge/useForge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/blockMapper.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CodeEditor({ onJumpRequest }) {
    _s();
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const syncLockRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const suppressSyncRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const htmlContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "CodeEditor.useForge[htmlContent]": (s)=>s.html
    }["CodeEditor.useForge[htmlContent]"]);
    const setHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "CodeEditor.useForge[setHtml]": (s)=>s.setHtml
    }["CodeEditor.useForge[setHtml]"]);
    const syncOn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "CodeEditor.useForge[syncOn]": (s)=>s.syncOn
    }["CodeEditor.useForge[syncOn]"]);
    const diffLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "CodeEditor.useForge[diffLines]": (s)=>s.diffLines
    }["CodeEditor.useForge[diffLines]"]);
    const lineWrap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "CodeEditor.useForge[lineWrap]": (s)=>s.lineWrap
    }["CodeEditor.useForge[lineWrap]"]);
    // Jump to a specific line (called by preview clicks / section nav)
    const jumpToLine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CodeEditor.useCallback[jumpToLine]": (line)=>{
            const ta = textareaRef.current;
            if (!ta || line < 0) return;
            suppressSyncRef.current = true;
            // Compute the character offset for the start of the target line
            const lines = ta.value.split("\n");
            let offset = 0;
            for(let i = 0; i < line && i < lines.length; i++){
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
            setTimeout({
                "CodeEditor.useCallback[jumpToLine]": ()=>ta.classList.remove("forge-flash")
            }["CodeEditor.useCallback[jumpToLine]"], 1200);
            setTimeout({
                "CodeEditor.useCallback[jumpToLine]": ()=>{
                    suppressSyncRef.current = false;
                }
            }["CodeEditor.useCallback[jumpToLine]"], 400);
        }
    }["CodeEditor.useCallback[jumpToLine]"], []);
    // Expose jumpToLine on window for preview/section-nav to call
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeEditor.useEffect": ()=>{
            window.__forgeJump = jumpToLine;
            onJumpRequest?.(-1);
        }
    }["CodeEditor.useEffect"], [
        jumpToLine,
        onJumpRequest
    ]);
    // Sync scroll: cursor movement -> scroll preview to matching section
    const handleSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CodeEditor.useCallback[handleSelect]": ()=>{
            if (!syncOn || syncLockRef.current || suppressSyncRef.current) return;
            const ta = textareaRef.current;
            if (!ta) return;
            syncLockRef.current = true;
            setTimeout({
                "CodeEditor.useCallback[handleSelect]": ()=>{
                    try {
                        const pos = ta.selectionStart;
                        const text = ta.value.substring(0, pos);
                        const line = text.split("\n").length - 1;
                        const jl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJumpList"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"].getState().html);
                        let target = 0;
                        for(let b = 0; b < jl.length; b++){
                            if (jl[b].line <= line) target = b;
                            else break;
                        }
                        const iframe = document.getElementById("forge-preview");
                        if (iframe?.contentDocument?.body) {
                            const sections = iframe.contentDocument.querySelectorAll("[data-forge-idx]");
                            if (sections[target]) {
                                sections[target].scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });
                            }
                        }
                    } catch  {
                    // ignore
                    }
                    syncLockRef.current = false;
                }
            }["CodeEditor.useCallback[handleSelect]"], 150);
        }
    }["CodeEditor.useCallback[handleSelect]"], [
        syncOn
    ]);
    // Tab key inserts two spaces instead of changing focus
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CodeEditor.useCallback[handleKeyDown]": (e)=>{
            if (e.key === "Tab") {
                e.preventDefault();
                const ta = e.currentTarget;
                const start = ta.selectionStart;
                const end = ta.selectionEnd;
                const newValue = ta.value.substring(0, start) + "  " + ta.value.substring(end);
                setHtml(newValue);
                requestAnimationFrame({
                    "CodeEditor.useCallback[handleKeyDown]": ()=>{
                        ta.selectionStart = ta.selectionEnd = start + 2;
                    }
                }["CodeEditor.useCallback[handleKeyDown]"]);
            }
        }
    }["CodeEditor.useCallback[handleKeyDown]"], [
        setHtml
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "forge-textarea-host",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                ref: textareaRef,
                className: "forge-textarea",
                value: htmlContent,
                onChange: (e)=>setHtml(e.target.value),
                onSelect: handleSelect,
                onKeyDown: handleKeyDown,
                spellCheck: false,
                wrap: lineWrap ? "soft" : "off",
                placeholder: "Paste your HTML bio here…",
                "aria-label": "HTML source editor"
            }, void 0, false, {
                fileName: "[project]/src/components/forge/CodeEditor.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            diffLines.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DiffIndicator, {
                count: diffLines.length
            }, void 0, false, {
                fileName: "[project]/src/components/forge/CodeEditor.tsx",
                lineNumber: 126,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/forge/CodeEditor.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
_s(CodeEditor, "QQnksCH79B8DlmGA8/eQcN/Z5+0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"]
    ];
});
_c = CodeEditor;
function DiffIndicator({ count }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
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
            zIndex: 5
        },
        children: [
            count,
            " diff line",
            count !== 1 ? "s" : ""
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/forge/CodeEditor.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_c1 = DiffIndicator;
var _c, _c1;
__turbopack_context__.k.register(_c, "CodeEditor");
__turbopack_context__.k.register(_c1, "DiffIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/forge/sanitizer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * HTML sanitizer for the preview iframe.
 *
 * Strips event handlers, scripts, and other active content so pasting foreign
 * HTML into the editor is safe to render.
 *
 * BUGFIX vs original:
 *  - Also strips <iframe>, <object>, <embed>, <link rel=import> tags
 *  - Only strips javascript: in href/src/style attributes (not in display text)
 */ /**
 * Sanitize HTML for safe preview rendering.
 * Returns a new string with active content removed.
 */ __turbopack_context__.s([
    "sanitize",
    ()=>sanitize
]);
function sanitize(html) {
    return html// Remove on* event handlers in double-quoted attributes
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")// Remove on* event handlers in single-quoted attributes
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")// Remove on* event handlers in unquoted attributes
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")// Remove <script>...</script> blocks
    .replace(/<script[\s\S]*?<\/script>/gi, "")// BUGFIX: also strip other active embed vectors
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "").replace(/<object[\s\S]*?<\/object>/gi, "").replace(/<embed[\s\S]*?<\/embed>/gi, "")// Remove <link rel="import"> (HTML imports)
    .replace(/<link\b[^>]*rel\s*=\s*["']?import["']?[^>]*>/gi, "")// BUGFIX: only strip javascript: inside href/src/style, not in text nodes.
    // Use a function to check the preceding attribute name.
    .replace(/(href|src|action|formaction|xlink:href|data|style)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, (match, _attr, _val)=>match.replace(/javascript:/gi, ""));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/PreviewPane.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PreviewPane
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/forge/useForge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$sanitizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/sanitizer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/blockMapper.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const PREVIEW_SHELL = `<!DOCTYPE html><html><head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Dancing+Script:wght@400;700&family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Jura:wght@300;400;500;600;700&family=Lexend:wght@300;400;600;700&family=Monoton&family=Poppins:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Press+Start+2P&family=Rock+Salt&family=VT323&display=swap">
<style>html,body{background:#141018 !important;color:#e7e2ee !important;overflow-x:hidden !important;margin:0;padding:0;}
img{max-width:100% !important;height:auto !important;}
[data-forge-idx]{scroll-margin-top:12px;}</style>
</head><body></body></html>`;
function PreviewPane() {
    _s();
    const htmlContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "PreviewPane.useForge[htmlContent]": (s)=>s.html
    }["PreviewPane.useForge[htmlContent]"]);
    const previewKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "PreviewPane.useForge[previewKey]": (s)=>s.previewKey
    }["PreviewPane.useForge[previewKey]"]);
    const setPreviewState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "PreviewPane.useForge[setPreviewState]": (s)=>s.setPreviewState
    }["PreviewPane.useForge[setPreviewState]"]);
    const iframeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const renderTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wiredRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [sectionStat, setSectionStat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("– sections");
    const previewSections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PreviewPane.useCallback[previewSections]": (doc)=>{
            const kids = doc.body.children;
            if (kids.length === 1) {
                const arr = [
                    kids[0]
                ];
                const inner = kids[0].children;
                if (inner.length === 1 && inner[0].tagName === "DIV" && inner[0].children.length > 0) {
                    const level2 = inner[0].children;
                    for(let c = 0; c < level2.length; c++)arr.push(level2[c]);
                } else {
                    for(let q = 0; q < inner.length; q++)arr.push(inner[q]);
                }
                return arr;
            }
            const out = [];
            for(let w = 0; w < kids.length; w++)out.push(kids[w]);
            return out;
        }
    }["PreviewPane.useCallback[previewSections]"], []);
    const wireClicks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PreviewPane.useCallback[wireClicks]": (doc)=>{
            if (wiredRef.current) return;
            try {
                doc.addEventListener("click", {
                    "PreviewPane.useCallback[wireClicks]": (e)=>{
                        let node = e.target;
                        while(node && node !== doc.body){
                            const el = node;
                            const idx = el.getAttribute?.("data-forge-idx");
                            if (idx !== null && idx !== undefined && idx !== "") {
                                const jumper = window.__forgeJump;
                                jumper?.(parseInt(idx, 10));
                                el.style.outline = "2px solid rgba(235,130,90,0.85)";
                                setTimeout({
                                    "PreviewPane.useCallback[wireClicks]": ()=>{
                                        el.style.outline = "";
                                    }
                                }["PreviewPane.useCallback[wireClicks]"], 900);
                                e.preventDefault();
                                return;
                            }
                            node = node.parentElement;
                        }
                    }
                }["PreviewPane.useCallback[wireClicks]"]);
                doc.__forgeWired = true;
                wiredRef.current = true;
            } catch  {
            // ignore
            }
        }
    }["PreviewPane.useCallback[wireClicks]"], []);
    const injectSectionIndices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PreviewPane.useCallback[injectSectionIndices]": (doc)=>{
            const jl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJumpList"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"].getState().html);
            const sections = previewSections(doc);
            let labeled = 0;
            for(let s = 0; s < sections.length && s < jl.length; s++){
                sections[s].setAttribute("data-forge-idx", String(s));
                labeled++;
            }
            return {
                labeled,
                total: jl.length
            };
        }
    }["PreviewPane.useCallback[injectSectionIndices]"], [
        previewSections
    ]);
    const renderPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PreviewPane.useCallback[renderPreview]": ()=>{
            const iframe = iframeRef.current;
            if (!iframe) return;
            const doc = iframe.contentDocument;
            if (!doc || !doc.body) return;
            // Preserve scroll
            let sy = 0;
            try {
                sy = iframe.contentWindow?.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop || 0;
            } catch  {
            // ignore
            }
            doc.body.innerHTML = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$sanitizer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitize"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"].getState().html);
            const { labeled, total } = injectSectionIndices(doc);
            wireClicks(doc);
            // Restore scroll
            try {
                iframe.contentWindow?.scrollTo(0, sy);
                doc.documentElement.scrollTop = sy;
                doc.body.scrollTop = sy;
            } catch  {
            // ignore
            }
            iframe.contentWindow?.requestAnimationFrame?.({
                "PreviewPane.useCallback[renderPreview]": ()=>{
                    try {
                        iframe.contentWindow?.scrollTo(0, sy);
                    } catch  {
                    // ignore
                    }
                }
            }["PreviewPane.useCallback[renderPreview]"]);
            setSectionStat(`${labeled} / ${total} sections`);
            setPreviewState({
                labeled,
                wired: wiredRef.current,
                accessible: true
            });
        }
    }["PreviewPane.useCallback[renderPreview]"], [
        injectSectionIndices,
        wireClicks,
        setPreviewState
    ]);
    // Debounced render on html change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PreviewPane.useEffect": ()=>{
            if (renderTimer.current) clearTimeout(renderTimer.current);
            renderTimer.current = setTimeout(renderPreview, 300);
            return ({
                "PreviewPane.useEffect": ()=>{
                    if (renderTimer.current) clearTimeout(renderTimer.current);
                }
            })["PreviewPane.useEffect"];
        }
    }["PreviewPane.useEffect"], [
        htmlContent,
        renderPreview
    ]);
    // Full refresh on previewKey change (rebuild the shell)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PreviewPane.useEffect": ()=>{
            const iframe = iframeRef.current;
            if (!iframe) return;
            wiredRef.current = false;
            iframe.onload = ({
                "PreviewPane.useEffect": ()=>{
                    renderPreview();
                }
            })["PreviewPane.useEffect"];
            iframe.srcdoc = PREVIEW_SHELL;
        }
    }["PreviewPane.useEffect"], [
        previewKey,
        renderPreview
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
        ref: iframeRef,
        id: "forge-preview",
        className: "forge-preview",
        title: "Live preview",
        sandbox: "allow-same-origin",
        srcDoc: PREVIEW_SHELL
    }, void 0, false, {
        fileName: "[project]/src/components/forge/PreviewPane.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
_s(PreviewPane, "idqO9h7udex0YtoVntDFMvgxGjk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"]
    ];
});
_c = PreviewPane;
var _c;
__turbopack_context__.k.register(_c, "PreviewPane");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/SectionNavigator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SectionNavigator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/forge/useForge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/forge/blockMapper.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function SectionNavigator() {
    _s();
    const htmlContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "SectionNavigator.useForge[htmlContent]": (s)=>s.html
    }["SectionNavigator.useForge[htmlContent]"]);
    const sections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SectionNavigator.useMemo[sections]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$forge$2f$blockMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJumpList"])(htmlContent)
    }["SectionNavigator.useMemo[sections]"], [
        htmlContent
    ]);
    const handleClick = (line)=>{
        const jumper = window.__forgeJump;
        jumper?.(line);
    };
    if (sections.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "forge-section-nav",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: "var(--forge-dim)",
                    fontSize: 11,
                    padding: 8
                },
                children: "No sections detected. Paste HTML to see the jump list."
            }, void 0, false, {
                fileName: "[project]/src/components/forge/SectionNavigator.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/forge/SectionNavigator.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "forge-section-nav",
        children: sections.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "forge-section-item",
                onClick: ()=>handleClick(s.line),
                title: `Jump to line ${s.line + 1}`,
                type: "button",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "num",
                        children: i
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/SectionNavigator.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tag",
                        children: [
                            "<",
                            s.tag,
                            ">"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/SectionNavigator.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "line",
                        children: [
                            "L",
                            s.line + 1
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/SectionNavigator.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this)
                ]
            }, `${i}-${s.line}`, true, {
                fileName: "[project]/src/components/forge/SectionNavigator.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/forge/SectionNavigator.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(SectionNavigator, "j6hCsBsP+bq32pzLJIDN3KlfUUc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"]
    ];
});
_c = SectionNavigator;
var _c;
__turbopack_context__.k.register(_c, "SectionNavigator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/ToastHost.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToastHost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/forge/useForge.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ToastHost() {
    _s();
    const toasts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "ToastHost.useForge[toasts]": (s)=>s.toasts
    }["ToastHost.useForge[toasts]"]);
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "ToastHost.useForge[dismiss]": (s)=>s.dismissToast
    }["ToastHost.useForge[dismiss]"]);
    if (toasts.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "forge-toast-host",
        role: "region",
        "aria-label": "Notifications",
        children: toasts.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `forge-toast ${t.kind}`,
                role: "alert",
                onClick: ()=>dismiss(t.id),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "title",
                        children: t.kind === "error" ? "Error" : t.kind === "ok" ? "Done" : "Note"
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/ToastHost.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: t.message
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/ToastHost.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this),
                    t.detail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "detail",
                        children: t.detail
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/ToastHost.tsx",
                        lineNumber: 24,
                        columnNumber: 24
                    }, this)
                ]
            }, t.id, true, {
                fileName: "[project]/src/components/forge/ToastHost.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/forge/ToastHost.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(ToastHost, "iJZak9fPCufjxPyb31xNBCYlAtQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"]
    ];
});
_c = ToastHost;
var _c;
__turbopack_context__.k.register(_c, "ToastHost");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forge/ForgeApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ForgeApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/resizable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/forge/useForge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$MetaBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forge/MetaBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$Toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forge/Toolbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$CodeEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forge/CodeEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$PreviewPane$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forge/PreviewPane.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$SectionNavigator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forge/SectionNavigator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$ToastHost$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forge/ToastHost.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function ForgeApp() {
    _s();
    const hydrate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "ForgeApp.useForge[hydrate]": (s)=>s.hydrate
    }["ForgeApp.useForge[hydrate]"]);
    const hydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "ForgeApp.useForge[hydrated]": (s)=>s.hydrated
    }["ForgeApp.useForge[hydrated]"]);
    const charCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "ForgeApp.useForge[charCount]": (s)=>s.charCount
    }["ForgeApp.useForge[charCount]"]);
    const wordCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "ForgeApp.useForge[wordCount]": (s)=>s.wordCount
    }["ForgeApp.useForge[wordCount]"]);
    const htmlContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "ForgeApp.useForge[htmlContent]": (s)=>s.html
    }["ForgeApp.useForge[htmlContent]"]);
    const setHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "ForgeApp.useForge[setHtml]": (s)=>s.setHtml
    }["ForgeApp.useForge[setHtml]"]);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "ForgeApp.useForge[toast]": (s)=>s.toast
    }["ForgeApp.useForge[toast]"]);
    const refreshPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"])({
        "ForgeApp.useForge[refreshPreview]": (s)=>s.refreshPreview
    }["ForgeApp.useForge[refreshPreview]"]);
    const jumpRequestRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [layout, setLayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("horizontal");
    // Hydrate vault on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ForgeApp.useEffect": ()=>{
            hydrate();
        }
    }["ForgeApp.useEffect"], [
        hydrate
    ]);
    // Responsive: stack vertically on narrow screens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ForgeApp.useEffect": ()=>{
            const update = {
                "ForgeApp.useEffect.update": ()=>{
                    setLayout(window.innerWidth < 900 ? "vertical" : "horizontal");
                }
            }["ForgeApp.useEffect.update"];
            update();
            window.addEventListener("resize", update);
            return ({
                "ForgeApp.useEffect": ()=>window.removeEventListener("resize", update)
            })["ForgeApp.useEffect"];
        }
    }["ForgeApp.useEffect"], []);
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ForgeApp.useEffect": ()=>{
            if (!hydrated) return;
            const handler = {
                "ForgeApp.useEffect.handler": (e)=>{
                    const mod = e.ctrlKey || e.metaKey;
                    if (!mod) return;
                    const key = e.key.toLowerCase();
                    if (key === "s") {
                        e.preventDefault();
                        // Force a vault flush by re-setting the html
                        setHtml(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"].getState().html);
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
                }
            }["ForgeApp.useEffect.handler"];
            window.addEventListener("keydown", handler);
            return ({
                "ForgeApp.useEffect": ()=>window.removeEventListener("keydown", handler)
            })["ForgeApp.useEffect"];
        }
    }["ForgeApp.useEffect"], [
        hydrated,
        setHtml,
        toast
    ]);
    // Live char/word count badge update
    const statText = `${charCount.toLocaleString()} chars · ${wordCount.toLocaleString()} words`;
    if (!hydrated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "forge-root",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "forge-wrap",
                style: {
                    alignItems: "center",
                    justifyContent: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        color: "var(--forge-dim)",
                        fontSize: 14
                    },
                    children: "Loading vault…"
                }, void 0, false, {
                    fileName: "[project]/src/components/forge/ForgeApp.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/forge/ForgeApp.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/forge/ForgeApp.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "forge-root",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "forge-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$MetaBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$Toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onOpenAbout: ()=>{},
                        onOpenToken: ()=>{}
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "forge-cols",
                        style: {
                            minHeight: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResizablePanelGroup"], {
                            direction: layout,
                            style: {
                                gap: 0,
                                flex: 1,
                                minHeight: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResizablePanel"], {
                                    defaultSize: 42,
                                    minSize: 25,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "forge-pane",
                                        style: {
                                            minHeight: "100%",
                                            height: "100%"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "forge-pane-head",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "HTML Source"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                            children: statText
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                            lineNumber: 103,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                lineNumber: 100,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$CodeEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                onJumpRequest: ()=>{}
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                lineNumber: 106,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResizableHandle"], {
                                    withHandle: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResizablePanel"], {
                                    defaultSize: 42,
                                    minSize: 25,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "forge-pane",
                                        style: {
                                            minHeight: "100%",
                                            height: "100%"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "forge-pane-head",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Live Preview"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                        lineNumber: 113,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hint",
                                                        children: "click any section to jump to its code ⇗"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                lineNumber: 112,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$PreviewPane$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                lineNumber: 116,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResizableHandle"], {
                                    withHandle: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResizablePanel"], {
                                    defaultSize: 16,
                                    minSize: 12,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "forge-pane",
                                        style: {
                                            minHeight: "100%",
                                            height: "100%"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "forge-pane-head",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Sections"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hint",
                                                        children: "click to jump"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                lineNumber: 122,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$SectionNavigator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                                lineNumber: 126,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/forge/ForgeApp.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        style: {
                            marginTop: "auto",
                            padding: "8px 0",
                            fontSize: 10,
                            color: "var(--forge-dim)",
                            textAlign: "center",
                            borderTop: "1px solid var(--forge-edge)",
                            flexShrink: 0
                        },
                        children: [
                            "JAI FORGE v1.0 · Next.js 16 · Local-only vault ·",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>refreshPreview(),
                                type: "button",
                                style: {
                                    background: "none",
                                    border: "none",
                                    color: "var(--forge-accent2)",
                                    cursor: "pointer",
                                    fontSize: 10,
                                    textDecoration: "underline"
                                },
                                children: "refresh preview"
                            }, void 0, false, {
                                fileName: "[project]/src/components/forge/ForgeApp.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/forge/ForgeApp.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/forge/ForgeApp.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forge$2f$ToastHost$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/forge/ForgeApp.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/forge/ForgeApp.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(ForgeApp, "df6bMqWPsrITuk+6Ws+bK8n6OdU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$forge$2f$useForge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForge"]
    ];
});
_c = ForgeApp;
var _c;
__turbopack_context__.k.register(_c, "ForgeApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_5e497983._.js.map