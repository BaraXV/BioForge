"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pipette } from "lucide-react";
import { useMemo, useState } from "react";
import { useForge } from "@/store/forge/useForge";

interface ColorPickerDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

/** Preset swatches — the forge accent/gold/ember/ok/bad palette the app
 *  already uses, plus a few common bio colors. Hex values are lowercase so
 *  they match what gets inserted at the cursor. */
const PRESETS: Array<{ name: string; hex: string }> = [
  { name: "accent", hex: "#785ab4" },
  { name: "accent2", hex: "#c4a0e4" },
  { name: "gold", hex: "#d4af55" },
  { name: "ember", hex: "#eb825a" },
  { name: "ok", hex: "#8cc88c" },
  { name: "bad", hex: "#eb6262" },
  { name: "ink", hex: "#100e14" },
  { name: "parchment", hex: "#f8f6f2" },
  { name: "crimson", hex: "#a02020" },
  { name: "teal", hex: "#3aa0a0" },
];

/** Validate a hex color string. Accepts 3- or 6-digit forms, with or without
 *  the leading '#'. Returns the canonical "#rrggbb" form or null. */
function normalizeHex(raw: string): string | null {
  const s = raw.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{6}$/.test(s)) return "#" + s.toLowerCase();
  if (/^[0-9a-fA-F]{3}$/.test(s)) {
    return "#" + s
      .split("")
      .map((c) => c + c)
      .join("")
      .toLowerCase();
  }
  return null;
}

export default function ColorPickerDialog({
  open,
  onOpenChange,
}: ColorPickerDialogProps) {
  const toast = useForge((s) => s.toast);
  const [hexInput, setHexInput] = useState<string>("#eb825a");
  const [nativeColor, setNativeColor] = useState<string>("#eb825a");

  const currentHex = useMemo(() => normalizeHex(hexInput) ?? "#000000", [hexInput]);

  const handleInsert = () => {
    const normalized = normalizeHex(hexInput);
    const value = normalized ?? nativeColor;
    if (!value) {
      toast("Pick a color first.", "error");
      return;
    }
    const inserter = (
      window as unknown as { __forgeInsertText?: (t: string) => void }
    ).__forgeInsertText;
    if (!inserter) {
      toast("Editor is not ready yet.", "error");
      return;
    }
    inserter(value);
    toast(`Inserted ${value} at cursor.`, "ok");
    onOpenChange(false);
  };

  const handleSwatchClick = (hex: string) => {
    setHexInput(hex);
    setNativeColor(hex);
  };

  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setNativeColor(v);
    setHexInput(v);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setHexInput(v);
    const normalized = normalizeHex(v);
    if (normalized) setNativeColor(normalized);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md"
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
            <Pipette size={16} /> Color Picker
          </DialogTitle>
        </DialogHeader>

        <div className="forge-color-picker">
          <div className="forge-color-picker-row">
            <label>Pick</label>
            <input
              type="color"
              className="forge-color-input-native"
              value={nativeColor}
              onChange={handleNativeChange}
              aria-label="Native color picker"
            />
            <div
              className="forge-color-preview"
              style={{ background: currentHex }}
              aria-hidden
            />
          </div>

          <div className="forge-color-picker-row">
            <label>Hex</label>
            <input
              type="text"
              className="forge-color-hex"
              value={hexInput}
              onChange={handleHexChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleInsert();
                }
              }}
              placeholder="#eb825a"
              spellCheck={false}
              aria-label="Hex color value"
              maxLength={7}
            />
          </div>

          <div>
            <div
              style={{
                fontSize: 10,
                color: "var(--forge-dim)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Presets
            </div>
            <div className="forge-color-swatches">
              {PRESETS.map((p) => (
                <button
                  key={p.hex}
                  type="button"
                  className={`forge-color-swatch ${
                    currentHex.toLowerCase() === p.hex.toLowerCase() ? "active" : ""
                  }`}
                  style={{ background: p.hex }}
                  onClick={() => handleSwatchClick(p.hex)}
                  title={`${p.name} — ${p.hex}`}
                  aria-label={`Preset ${p.name} ${p.hex}`}
                />
              ))}
            </div>
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
            Cancel
          </Button>
          <Button onClick={handleInsert} type="button">
            Insert at cursor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
