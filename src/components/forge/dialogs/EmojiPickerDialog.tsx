"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import { useMemo, useState } from "react";
import { useForge } from "@/store/forge/useForge";

interface EmojiPickerDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

interface EmojiCategory {
  key: string;
  label: string;
  symbols: string[];
}

/**
 * Curated symbol sets useful for HTML bios. Heavy on box-drawing and dingbat
 * characters since those survive the sanitizer and render reliably across
 * JanitorAI's reader. Symbols are stored as the literal characters so the
 * picker doesn't need to do any HTML-entity decoding on insert.
 */
const CATEGORIES: EmojiCategory[] = [
  {
    key: "decorative",
    label: "Decorative",
    symbols: [
      "✦", "✧", "⬡", "⬢", "◆", "◇", "✶", "✷", "✸", "✺",
      "❖", "✪", "✫", "✬", "❂", "❁", "❀", "✾", "✽", "❃",
      "⟡", "⟢", "⟣", "⌖", "⌑", "⌭",
    ],
  },
  {
    key: "dividers",
    label: "Dividers",
    symbols: [
      "─", "━", "│", "┃", "═", "║", "┄", "┅", "┆", "┇",
      "┈", "┉", "┊", "┋", "╌", "╍", "╴", "╵", "╶", "╷",
      "╭", "╮", "╯", "╰", "╳", "╲", "╱",
    ],
  },
  {
    key: "arrows",
    label: "Arrows",
    symbols: [
      "←", "→", "↑", "↓", "↔", "↕", "↖", "↗", "↘", "↙",
      "⇐", "⇒", "⇑", "⇓", "⇔", "⇕", "➤", "➔", "➞", "➟",
      "➠", "➡", "⬅", "⬆", "⬇", "⤴", "⤵",
    ],
  },
  {
    key: "bullets",
    label: "Bullets",
    symbols: [
      "•", "◦", "▪", "▫", "■", "□", "●", "○", "◐", "◑",
      "◒", "◓", "◔", "◕", "◖", "◗", "◘", "◙", "⚙", "⚜",
    ],
  },
  {
    key: "stars",
    label: "Stars",
    symbols: [
      "★", "☆", "✪", "✫", "✬", "✭", "✮", "✯", "✰", "✡",
      "✦", "✧", "✶", "✷", "✸", "✺", "✻", "✼", "❂", "❄",
    ],
  },
  {
    key: "hearts",
    label: "Hearts",
    symbols: [
      "♥", "♡", "❤", "❥", "❦", "❧", "❣", "❢", "❡", "🎔",
      "💔", "❤️", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💗",
    ],
  },
  {
    key: "suits",
    label: "Suits",
    symbols: ["♠", "♣", "♥", "♦", "♤", "♧", "♡", "♢"],
  },
  {
    key: "misc",
    label: "Misc",
    symbols: [
      "✓", "✗", "✔", "✘", "✚", "✛", "✜", "✝", "✞", "✟",
      "⚡", "☀", "☁", "☂", "☃", "☄", "★", "☆", "☯", "☮",
      "☠", "☢", "☣", "♻", "♾", "⌘", "⌥", "⇪",
    ],
  },
];

export default function EmojiPickerDialog({
  open,
  onOpenChange,
}: EmojiPickerDialogProps) {
  const toast = useForge((s) => s.toast);
  const [activeCategory, setActiveCategory] = useState<string>("decorative");
  const [query, setQuery] = useState("");

  /** Search across every category — returns a flat list of unique symbols
   *  whose category label or symbol matches the query. Used when the user
   *  types in the search box. */
  const searchHits = useMemo<string[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out: string[] = [];
    const seen = new Set<string>();
    for (const cat of CATEGORIES) {
      if (cat.label.toLowerCase().includes(q)) {
        for (const s of cat.symbols) {
          if (!seen.has(s)) {
            seen.add(s);
            out.push(s);
          }
        }
      }
    }
    return out;
  }, [query]);

  const insertSymbol = (sym: string) => {
    const inserter = (
      window as unknown as { __forgeInsertText?: (t: string) => void }
    ).__forgeInsertText;
    if (!inserter) {
      toast("Editor is not ready yet.", "error");
      return;
    }
    inserter(sym);
    // Keep the dialog open so the user can pick several in a row; toast
    // confirms each insert without being intrusive.
  };

  const renderCategory = (cat: EmojiCategory) => (
    <div key={cat.key}>
      <div className="forge-emoji-section-label">{cat.label}</div>
      {cat.symbols.map((s, i) => (
        <button
          key={`${cat.key}-${i}-${s}`}
          type="button"
          className="forge-emoji-cell"
          onClick={() => insertSymbol(s)}
          title={s}
          aria-label={`Insert symbol ${s}`}
        >
          {s}
        </button>
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-xl"
        style={{
          background: "var(--forge-panel)",
          color: "var(--forge-text)",
          border: "1px solid var(--forge-edge)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-2"
            style={{ color: "var(--forge-accent2)" }}
          >
            <Smile size={16} /> Symbols & Special Characters
          </DialogTitle>
        </DialogHeader>

        <div className="forge-emoji-picker">
          <input
            type="text"
            className="forge-emoji-search"
            placeholder="Search by category name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search symbols"
          />

          {!query && (
            <div className="forge-emoji-tabs" role="tablist">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.key}
                  className={`forge-emoji-tab ${
                    activeCategory === cat.key ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          <div className="forge-emoji-grid">
            {query ? (
              searchHits.length > 0 ? (
                <>
                  <div className="forge-emoji-section-label">Search results</div>
                  {searchHits.map((s, i) => (
                    <button
                      key={`hit-${i}-${s}`}
                      type="button"
                      className="forge-emoji-cell"
                      onClick={() => insertSymbol(s)}
                      title={s}
                      aria-label={`Insert symbol ${s}`}
                    >
                      {s}
                    </button>
                  ))}
                </>
              ) : (
                <div className="forge-emoji-empty">
                  No symbols match — try a category name like “stars” or “arrows”.
                </div>
              )
            ) : (
              CATEGORIES.filter((c) => c.key === activeCategory).map(renderCategory)
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            type="button"
            variant="outline"
            style={{
              background: "transparent",
              borderColor: "var(--forge-edge)",
              color: "var(--forge-dim)",
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
