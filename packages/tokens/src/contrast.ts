import { ContrastPair, TokenAuditResult } from "./types.js";
import { ResolvedSystem } from "./resolve.js";
import { contrastAuditPairs } from "./tokens.config.js";

/**
 * Parses a hex color string (#fff, #ffffff, #ffffff80) into [r, g, b] (0-255)
 */
export function parseHexColor(hex: string): [number, number, number] {
  let cleanHex = hex.trim().replace(/^#/, "");

  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  if (cleanHex.length === 6 || cleanHex.length === 8) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return [r, g, b];
  }

  throw new Error(`Unsupported color format for contrast calculation: "${hex}"`);
}

/**
 * Calculates WCAG 2.1 relative luminance for an [r, g, b] color (0-255)
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const sRGB = [r, g, b].map((val) => {
    const channel = val / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Calculates WCAG contrast ratio between two hex colors
 */
export function getContrastRatio(foregroundHex: string, backgroundHex: string): number {
  const fgRgb = parseHexColor(foregroundHex);
  const bgRgb = parseHexColor(backgroundHex);

  const l1 = getRelativeLuminance(...fgRgb);
  const l2 = getRelativeLuminance(...bgRgb);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  // Round to 2 decimal places
  return Math.round(ratio * 100) / 100;
}

/**
 * Audits all configured contrast pairs in both light and dark mode.
 * Throws a detailed error listing all failing pairs if any fail WCAG AA (4.5:1).
 */
export function auditContrast(
  resolved: ResolvedSystem,
  pairs: ContrastPair[] = contrastAuditPairs
): TokenAuditResult[] {
  const results: TokenAuditResult[] = [];
  const failures: TokenAuditResult[] = [];

  const modes: ("light" | "dark")[] = ["light", "dark"];

  for (const mode of modes) {
    const modeTokens = resolved[mode].tokens;

    for (const pair of pairs) {
      const fgColor = modeTokens[pair.foreground];
      const bgColor = modeTokens[pair.background];

      if (!fgColor || typeof fgColor !== "string") {
        throw new Error(
          `[Contrast Audit Config Error] Foreground token "${pair.foreground}" not found or not a color string in mode "${mode}".`
        );
      }
      if (!bgColor || typeof bgColor !== "string") {
        throw new Error(
          `[Contrast Audit Config Error] Background token "${pair.background}" not found or not a color string in mode "${mode}".`
        );
      }

      const requiredRatio = pair.minRatio ?? 4.5;
      const ratio = getContrastRatio(fgColor, bgColor);
      const passed = ratio >= requiredRatio;

      const result: TokenAuditResult = {
        pair,
        mode,
        fgColor,
        bgColor,
        contrastRatio: ratio,
        passed,
        requiredRatio,
      };

      results.push(result);

      if (!passed) {
        failures.push(result);
      }
    }
  }

  if (failures.length > 0) {
    const failureReport = failures
      .map(
        (f) =>
          `  - [${f.mode.toUpperCase()}] "${f.pair.name}": ${f.contrastRatio}:1 (Required: ${f.requiredRatio}:1)\n` +
          `      FG: ${f.pair.foreground} (${f.fgColor})\n` +
          `      BG: ${f.pair.background} (${f.bgColor})`
      )
      .join("\n\n");

    throw new Error(
      `[WCAG AA Contrast Audit FAILED]\nThe following ${failures.length} color pair(s) failed the minimum contrast ratio:\n\n${failureReport}\n`
    );
  }

  return results;
}
