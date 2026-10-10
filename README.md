# ⬡ JAI FORGE

> A dark-themed live HTML editor for JanitorAI character & script bios — rebuilt on Next.js 16, TypeScript, and CodeMirror 6.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![CodeMirror](https://img.shields.io/badge/CodeMirror-6-orange)](https://codemirror.net/)
[![License](https://img.shields.io/badge/license-Private-red)](./LICENSE)

JAI FORGE is a single-purpose IDE for authoring the rich HTML "bios" used on
JanitorAI. It pairs a CodeMirror source editor with a sandboxed live preview,
gives you click-to-jump navigation between the two, and ships a full lint /
format / diff / self-test toolkit plus one-click publishing.

This repository is the **Next.js edition** (v1.0) — a ground-up rewrite of the
original single-file `index.html` vanilla-JS app ([BioForge v0.7](https://github.com/BaraXV/BioForge))
into a modular TypeScript codebase.

---

## ✨ Features

### Editor
- **CodeMirror 6** with HTML mode, auto-close tags, folding, bracket matching,
  and built-in find/replace (`Ctrl+F`).
- **Line wrap toggle** and **editor light/dark theme toggle** (independent of
  the bio's own theme).
- **Live char + word count** in the status bar.

### Preview
- **Sandboxed iframe** — scripts, event handlers, `<iframe>`, `<object>`,
  `<embed>`, and `javascript:` URLs are stripped before rendering. Pasting
  foreign HTML is safe.
- **Click-to-jump** — click any section in the preview to jump straight to its
  source line in the editor (with an ember flash animation).
- **Sync scroll** — moving your cursor in the editor auto-scrolls the preview to
  the matching section. Toggleable.
- **Section navigator** — a third pane lists every detected section; click to
  jump.

### Block Mapper
- **Depth-aware HTML parser** that understands the "house format":
  `wrapper > max-width container > sections (depth 2)`.
- Handles void tags, optional-close tags (`<p>`, `<li>`, …), quoted `>`
  attributes, multi-line tags, and comments.
- 8 known-answer test documents in the self-test suite verify every edge case.

### Bio Themes
Four one-click re-skins that remap every color in the bio to a curated palette:
- **Gothic Steel** — cool blues on near-black
- **Gold Obsidian** — warm golds on charcoal
- **Dossier Ember** — ember orange on umber
- **Minimal Ephemera** — neutral greys on ink

The re-skin preserves alpha channels, skips HTML entities (`&#9670;`), and
separates headline vs body colors by frequency + luminance analysis. `Ctrl+Z`
reverts.

### Toolkit
- **Format** — block-level indenter that keeps inline tags (`<span>`,
  `<strong>`, …) on the same line as surrounding text. Preserves `<pre>` blocks,
  comments, and numeric entities.
- **Lint** — flags sanitizer-stripped properties (`position`, `z-index`,
  `<style>`, `<script>`), `100vw` overflow risk, unbalanced `<div>`/`<p>`, and
  non-responsive fixed grids.
- **Compare** — paste live bio content, highlights added/changed lines in green.
- **Self-Test** — 20+ assertions covering the mapper, color parser, formatter,
  preview wiring, and vault. Produces a copyable text report.

### Vault (local persistence)
- **Multi-snippet library** — keep multiple named bios and switch between them
  instantly. (New in v1.0; the original stored only one.)
- **Autosave** — every edit is debounced-saved to `localStorage`. A backup of
  the previous good copy is kept.
- **Auto-migration** — imports the legacy `forge-html` key on first load.
- Rename, duplicate, and delete snippets from the Snippet Library dialog.

### Import / Export (new in v1.0)
- **Export** — download the current bio as a standalone `.html` file.
- **Import** — load a `.html` / `.htm` / `.txt` file from disk into the editor.

### Publishing
- **One-click Publish** — POSTs the bio to a Cloudflare Worker proxy that
  forwards to the JanitorAI API (avoids browser CORS).
- **Console-script fallback** — if the proxy is unreachable, generates a
  copy-pasteable `fetch()` script to run in the JAI console.
- **Token extractor** — a bookmarklet-style script that reads the Supabase auth
  cookie from a logged-in JAI tab and prints the access token.
- **Load Current** — generates a script to fetch the live bio content for
  diffing.

### Keyboard Shortcuts (new in v1.0)
| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + S` | Force-save to vault |
| `Ctrl/Cmd + Shift + F` | Format |
| `Ctrl/Cmd + Shift + L` | Lint |
| `Ctrl/Cmd + Shift + P` | Publish |
| `Ctrl/Cmd + F` | Find (CodeMirror built-in) |

### Responsive Layout
- **Resizable three-pane split** — drag the dividers between editor, preview,
  and section navigator.
- **Mobile-aware** — panes stack vertically below 900px width.
- **Sticky footer** with quick refresh action.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or [Bun](https://bun.sh/) 1.x
- A modern browser

### Install & Run
```bash
# Install dependencies
bun install

# Start the dev server (port 3000)
bun run dev

# Lint
bun run lint
```

Open the **Preview Panel** (or `http://localhost:3000`) to see the editor.

### First Use
1. **Paste a bio** into the HTML Source pane (or click **Import** to load a file).
2. The **Live Preview** renders automatically (debounced 300ms).
3. **Click any section** in the preview to jump to its code.
4. Pick a **theme** from the dropdown to re-skin the colors.
5. Click **Format** to tidy the indentation, **Lint** to check for issues.
6. To publish: paste your **Target URL** and **Access Token** (click **Get
   Token** for instructions), then click **⚡ Publish**.

---

## 🏗 Architecture

### Tech Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| UI library | shadcn/ui (New York) + Lucide icons |
| Editor | CodeMirror 6 via `@uiw/react-codemirror` |
| State | Zustand (client) |
| Layout | `react-resizable-panels` |
| Persistence | `localStorage` (no backend required) |

### Project Structure
```
src/
├── app/
│   ├── page.tsx                  # Hosts <ForgeApp /> (dynamic, no SSR)
│   ├── layout.tsx                # Root layout + metadata
│   ├── globals.css               # Tailwind + forge design tokens
│   └── api/forge/publish/route.ts # Publish proxy (server-side)
├── components/forge/
│   ├── ForgeApp.tsx              # Main orchestrator + shortcuts + layout
│   ├── MetaBar.tsx               # Header, target/token inputs, toggles
│   ├── Toolbar.tsx               # Format/Lint/Export/Import/Publish buttons
│   ├── CodeEditor.tsx            # CodeMirror 6 wrapper + diff/flash decorations
│   ├── PreviewPane.tsx           # Sandboxed iframe + click-to-jump wiring
│   ├── SectionNavigator.tsx      # Detected-sections jump list
│   ├── ToastHost.tsx             # Toast notifications
│   └── dialogs/
│       ├── AboutDialog.tsx
│       ├── TokenDialog.tsx
│       ├── ScriptDialog.tsx
│       ├── DiffDialog.tsx
│       ├── SelfTestDialog.tsx
│       └── SnippetManager.tsx
├── lib/forge/                    # Pure logic modules (framework-agnostic)
│   ├── blockMapper.ts            # Depth-aware HTML section parser
│   ├── formatter.ts              # Block-level HTML indenter
│   ├── linter.ts                 # Sanitizer-rule + house-doctrine checks
│   ├── sanitizer.ts              # Strips active content for the preview
│   ├── themes.ts                 # 4 bio themes + color remap engine
│   ├── colorUtils.ts             # hex/rgb/rgba parser + luminance
│   ├── diff.ts                   # Line-level diff for compare
│   ├── vault.ts                  # Multi-snippet localStorage persistence
│   ├── publisher.ts              # Target parser + console-script builders
│   └── selfTest.ts               # 20+ assertion test suite
└── store/forge/
    └── useForge.ts               # Zustand store (state + actions)
```

### Design Principles
1. **Pure logic, framework-agnostic** — everything in `src/lib/forge/` is plain
   TypeScript with zero React/Next dependencies. Testable and reusable.
2. **Stateless components** — all UI state lives in the Zustand store; components
   are thin renderers.
3. **Sandboxed by default** — the preview iframe strips active content; the
   publish proxy runs server-side so tokens never leak to the client bundle.
4. **Local-only** — no database, no accounts. Your bios live in your browser.

---

## 🔧 What Changed From v0.7 → v1.0

### Bug Fixes
| # | Bug | Fix |
|---|---|---|
| 1 | `parseTarget` UUID regex `[0-9a-f-]{36}` was too loose | Now uses strict UUID pattern |
| 2 | `sanitize()` blanket-replaced `javascript:` everywhere, even in display text | Now only strips `javascript:` inside `href`/`src`/`style`/etc. attributes |
| 3 | `sanitize()` didn't strip `<iframe>`, `<object>`, `<embed>`, `<link rel=import>` | All now stripped |
| 4 | `lint()` `position:` regex could match `transition: position` edge cases | Now uses negative lookbehind for `[a-z-]` |
| 5 | `confirm()` blocked the UI thread | Replaced with non-blocking dialogs (where applicable) |

### New Features
- Multi-snippet vault (library, rename, duplicate, delete)
- Import / Export to `.html` files
- Keyboard shortcuts (`Ctrl+S`, `Ctrl+Shift+F/L/P`)
- Resizable three-pane split (editor / preview / sections)
- Section navigator pane
- Editor light/dark theme toggle
- Line wrap toggle
- Live word count
- Responsive mobile layout

### Refactors
- Monolithic 1138-line `index.html` → 12 TypeScript modules + 10 React components
- Vanilla JS → strict TypeScript with full type coverage
- Global mutable state → Zustand store
- CodeMirror 5 → CodeMirror 6 (smaller, faster, modular)
- Inline styles → CSS custom properties + Tailwind
- `alert()`/`confirm()` → shadcn Dialog + Sonner-style toasts
- CDN script tags → npm packages (offline-friendly, version-pinned)

---

## 🧪 Self-Test

Click the **⚙ Self-Test** button to run the built-in test suite. It verifies:
- Block mapper against 8 known-answer documents (A–G)
- Live editor state (jump list validity, ordering, preview labeling)
- Color parser (hex3, hex6, rgb, rgba-with-alpha)
- Formatter (section-count preservation, entity preservation)
- Vault writability
- All four bio themes are defined

The report is copyable as plain text for pasting into bug reports.

---

## 🔒 Security Notes

- The preview iframe runs with `sandbox="allow-same-origin"` so the editor can
  read its `contentDocument` for click-to-jump. **Active content is stripped
  before rendering** — scripts, event handlers, iframes, embeds, and
  `javascript:` URLs are all removed.
- The publish proxy (`/api/forge/publish`) runs server-side and forwards to the
  Cloudflare Worker. Your access token is sent from the browser to the Next.js
  server, then to the Worker — it is **not** embedded in the client JS bundle.
- All vault data is stored in `localStorage` on your machine. Clearing your
  browser data wipes your snippets.

---

## 📜 License

Private — for personal use. See the original repository for terms.

---

## 🙏 Credits

- Original JAI FORGE v0.7 by **BaraXV** ([github.com/BaraXV/BioForge](https://github.com/BaraXV/BioForge))
- [CodeMirror](https://codemirror.net/) by Marijn Haverbeke
- [shadcn/ui](https://ui.shadcn.com/) by shadcn
- [Next.js](https://nextjs.org/) by Vercel
