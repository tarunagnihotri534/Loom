import { describe, it, expect } from "vitest";
import {
  parseHexColor,
  getRelativeLuminance,
  getContrastRatio,
  auditContrast,
} from "../src/contrast.js";
import { resolveTokens } from "../src/resolve.js";
import { tokensConfig, contrastAuditPairs } from "../src/tokens.config.js";
import { ContrastPair } from "../src/types.js";

describe("WCAG AA Contrast Audit", () => {
  it("correctly calculates relative luminance for standard colors", () => {
    // White has luminance 1.0
    const [rw, gw, bw] = parseHexColor("#ffffff");
    expect(getRelativeLuminance(rw, gw, bw)).toBeCloseTo(1.0, 4);

    // Black has luminance 0.0
    const [rb, gb, bb] = parseHexColor("#000000");
    expect(getRelativeLuminance(rb, gb, bb)).toBeCloseTo(0.0, 4);
  });

  it("calculates accurate contrast ratios", () => {
    // Black on white is 21:1
    expect(getContrastRatio("#000000", "#ffffff")).toBe(21);
    expect(getContrastRatio("#ffffff", "#000000")).toBe(21);

    // Identical colors have contrast 1:1
    expect(getContrastRatio("#ffffff", "#ffffff")).toBe(1);
    expect(getContrastRatio("#2563eb", "#2563eb")).toBe(1);
  });

  it("passes contrast audit for all production pairs in light and dark mode", () => {
    const resolved = resolveTokens(tokensConfig);
    const results = auditContrast(resolved, contrastAuditPairs);

    expect(results.length).toBeGreaterThan(0);
    for (const res of results) {
      expect(res.passed).toBe(true);
      expect(res.contrastRatio).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("fails the audit and throws a detailed error when a pair falls below 4.5:1", () => {
    const resolved = resolveTokens(tokensConfig);

    // Deliberately failing test pair: light gray on white
    const failingPairs: ContrastPair[] = [
      {
        name: "Low Contrast Mock Test",
        foreground: "semantic.color.border.default", // #e5e7eb on light
        background: "semantic.color.bg.surface",     // #ffffff on light
        minRatio: 4.5,
      },
    ];

    expect(() => auditContrast(resolved, failingPairs)).toThrowError(
      /\[WCAG AA Contrast Audit FAILED\]/
    );
  });
});
