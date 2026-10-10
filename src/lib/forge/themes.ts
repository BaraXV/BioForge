/**
 * Bio theme re-skinning.
 *
 * Remaps colors in a bio HTML string to one of four preset palettes.
 * Preserves alpha, avoids HTML entities, and separates headline vs body colors.
 */

import { parseColor, toCss, luminance, type RGB } from "./colorUtils";

export interface BioTheme {
  bg: string;
  headline: string;
  body: string;
  soft: string;
  gold: string;
  goldtext: string;
}

export const THEMES: Record<string, BioTheme> = {
  gothic: {
    bg: "#0d0e14", headline: "#d6e0fa", body: "#b9b3ad",
    soft: "#9ab0d2", gold: "#d4af55", goldtext: "#e8cd8c",
  },
  gold: {
    bg: "#0b0a08", headline: "#f0e6c8", body: "#cfc4a8",
    soft: "#c9a84c", gold: "#c9a84c", goldtext: "#e8d5a0",
  },
  ember: {
    bg: "#120c0a", headline: "#ece2dc", body: "#d8ccc4",
    soft: "#eb826e", gold: "#c9a84c", goldtext: "#e8d5a0",
  },
  minimal: {
    bg: "#0a0a0d", headline: "#f4f8ff", body: "#c2c9d4",
    soft: "#9ab0d2", gold: "#c9a84c", goldtext: "#e8d5a0",
  },
};

export interface ThemeApplyResult {
  html: string;
  remappedCount: number;
  themeName: string;
}

/**
 * Apply a bio theme to an HTML string, remapping colors in place.
 * Returns the new HTML and the number of color slots remapped.
 */
export function applyThemeToHtml(
  html: string,
  name: string,
): ThemeApplyResult | null {
  const T = THEMES[name];
  if (!T) return null;

  // Re-skin the wrapper background-color
  const wrapperRe =
    /(<div\s+style="[^"]*?(?:^|;)\s*background-color\s*:\s*)(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))/;
  if (wrapperRe.test(html)) {
    html = html.replace(wrapperRe, (_all, pre: string, color: string) => {
      const rgb = parseColor(color);
      return pre + (rgb ? T.bg : color);
    });
  }

  // Scan for headline colors (spans with font-size >= 1.3rem)
  const colors: Record<string, { count: number }> = {};
  const headlineColors: Record<string, boolean> = {};
  const spanRe = /(<span[^>]*font-size\s*:\s*([\d.]+)rem[^>]*>)([\s\S]*?)<\/span>/g;
  let sm: RegExpExecArray | null;
  while ((sm = spanRe.exec(html)) !== null) {
    if (parseFloat(sm[2]) >= 1.3) {
      const cRe = /(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgba?\([^)]*\))/g;
      let cm3: RegExpExecArray | null;
      const both = sm[1] + sm[3];
      while ((cm3 = cRe.exec(both)) !== null) {
        headlineColors[cm3[1].toLowerCase()] = true;
      }
    }
  }

  // Count all colors
  const allRe = /(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgba?\([^)]*\))/g;
  let am: RegExpExecArray | null;
  while ((am = allRe.exec(html)) !== null) {
    const key = am[1].toLowerCase();
    if (!colors[key]) colors[key] = { count: 0 };
    colors[key].count++;
  }

  // Pick body & soft colors (non-headline, mid-luminance, by frequency)
  const candidates = Object.keys(colors)
    .map((k) => {
      const rgb = parseColor(k);
      const lum = rgb ? luminance(rgb) : -1;
      return { k, count: colors[k].count, lum, isHead: !!headlineColors[k] };
    })
    .filter((c) => c.lum >= 60 && c.lum <= 220);
  candidates.sort((a, b) => b.count - a.count);

  let bodyColor: string | null = null;
  let softColor: string | null = null;
  for (const c of candidates) {
    if (!c.isHead && !bodyColor) bodyColor = c.k;
    else if (!c.isHead && bodyColor && c.k !== bodyColor && !softColor) {
      softColor = c.k;
    }
  }

  const map: Record<string, string> = {};
  if (bodyColor) map[bodyColor] = T.body;
  if (softColor) map[softColor] = T.soft;
  Object.keys(headlineColors).forEach((hc) => {
    map[hc] = T.headline;
  });
  candidates.forEach((c) => {
    if (!map[c.k] && c.lum > 120) {
      const rgb = parseColor(c.k);
      if (rgb && rgb[0] > rgb[2]) map[c.k] = T.gold;
    }
  });

  html = html.replace(
    /(#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|rgba?\([^)]*\))/g,
    (match, offset, str) => {
      // Skip HTML entities like &#9670;
      if (offset > 0 && str.charAt(offset - 1) === "&") return match;
      if (offset > 0 && /[&\w]/.test(str.charAt(offset - 1))) return match;
      const k = match.toLowerCase();
      const newColor = map[k];
      if (!newColor) return match;
      const oldRgb = parseColor(match);
      const newRgb = parseColor(newColor);
      if (oldRgb && newRgb && oldRgb.length === 4) {
        return toCss([newRgb[0], newRgb[1], newRgb[2], (oldRgb as RGB)[3] as number] as RGB);
      }
      return newColor;
    },
  );

  return { html, remappedCount: Object.keys(map).length, themeName: name };
}
