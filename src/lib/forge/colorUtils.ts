/**
 * Color utilities — ported from BioForge index.html with stricter typing.
 * Handles hex3, hex6, rgb(), and rgba() parsing/serialization.
 */

export type RGB = [number, number, number] | [number, number, number, number];

const HEX3_RE = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;
const HEX6_RE = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
const RGBA_RE = /^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\s*\)$/i;

export function parseColor(c: string): RGB | null {
  if (!c) return null;
  const s = c.trim();
  let m = HEX3_RE.exec(s);
  if (m) {
    return [
      parseInt(m[1] + m[1], 16),
      parseInt(m[2] + m[2], 16),
      parseInt(m[3] + m[3], 16),
    ];
  }
  m = HEX6_RE.exec(s);
  if (m) {
    return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
  }
  m = RGBA_RE.exec(s);
  if (m) {
    return [
      +m[1],
      +m[2],
      +m[3],
      m[4] !== undefined ? parseFloat(m[4]) : 1,
    ] as RGB;
  }
  return null;
}

export function toCss(rgb: RGB): string {
  if (rgb.length === 4 && rgb[3] < 1) {
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${rgb[3]})`;
  }
  const h = (n: number) => {
    const s = n.toString(16);
    return s.length === 1 ? "0" + s : s;
  };
  return `#${h(rgb[0])}${h(rgb[1])}${h(rgb[2])}`;
}

export function luminance(rgb: RGB): number {
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
