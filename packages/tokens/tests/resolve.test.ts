import { describe, it, expect } from "vitest";
import { resolveTokens, getByPath } from "../src/resolve.js";
import { tokensConfig } from "../src/tokens.config.js";

describe("Token Resolution & 3-Tier Layering", () => {
  it("resolves the production token configuration successfully", () => {
    const resolved = resolveTokens(tokensConfig);

    expect(resolved.primitive).toBeDefined();
    expect(resolved.light).toBeDefined();
    expect(resolved.dark).toBeDefined();

    // Primitive values are raw
    expect(resolved.primitive["color.gray.900"]).toBe("#111827");
    expect(resolved.primitive["spacing.4"]).toBe("1rem");

    // Semantic resolves to primitive values
    expect(resolved.light.tokens["semantic.color.bg.canvas"]).toBe("#f9fafb");
    expect(resolved.dark.tokens["semantic.color.bg.canvas"]).toBe("#030712");

    // Component resolves to semantic values
    expect(resolved.light.tokens["component.button.primaryBg"]).toBe("#2563eb");
    expect(resolved.light.tokens["component.button.radius"]).toBe("0.5rem");

    // CSS variables are correctly formatted with --loom- prefix and kebab-case
    expect(resolved.light.cssVariables["--loom-color-bg-canvas"]).toBe("#f9fafb");
    expect(resolved.light.cssVariables["--loom-button-radius"]).toBe("0.5rem");
    expect(resolved.light.cssVariables["--loom-button-primary-bg"]).toBe("#2563eb");
    expect(resolved.dark.cssVariables["--loom-color-bg-canvas"]).toBe("#030712");
  });

  it("fails if primitive layer contains an alias", () => {
    const badConfig: any = {
      primitive: {
        color: {
          gray: {
            900: "#111827",
            bad: "{primitive.color.gray.900}",
          },
        },
      },
      semantic: { modes: { light: {}, dark: {} } },
      component: {},
    };

    expect(() => resolveTokens(badConfig)).toThrow(
      /Invalid alias in primitive layer/
    );
  });

  it("fails if semantic layer references an invalid layer or broken alias", () => {
    // 1. Semantic referencing non-existent primitive
    const brokenAliasConfig: any = {
      primitive: { color: { white: "#ffffff" } },
      semantic: {
        modes: {
          light: { color: { bg: "{primitive.color.doesNotExist}" } },
          dark: { color: { bg: "{primitive.color.doesNotExist}" } },
        },
      },
      component: {},
    };
    expect(() => resolveTokens(brokenAliasConfig)).toThrow(/Broken alias/);

    // 2. Semantic referencing another semantic token (lateral reference)
    const lateralRefConfig: any = {
      primitive: { color: { white: "#ffffff" } },
      semantic: {
        modes: {
          light: {
            color: {
              surface: "{primitive.color.white}",
              canvas: "{semantic.color.surface}",
            },
          },
          dark: {
            color: {
              surface: "{primitive.color.white}",
              canvas: "{semantic.color.surface}",
            },
          },
        },
      },
      component: {},
    };
    expect(() => resolveTokens(lateralRefConfig)).toThrow(
      /Semantic tokens may ONLY reference primitive tokens/
    );
  });

  it("fails if component layer attempts to bypass semantic layer to reference primitive", () => {
    const bypassConfig: any = {
      primitive: {
        radius: { md: "8px" },
      },
      semantic: {
        modes: { light: {}, dark: {} },
        radius: { md: "{primitive.radius.md}" },
      },
      component: {
        button: {
          radius: "{primitive.radius.md}", // Illegal bypass!
        },
      },
    };

    expect(() => resolveTokens(bypassConfig)).toThrow(
      /Component tokens may NOT bypass semantic layer/
    );
  });

  it("fails if component layer has broken alias", () => {
    const brokenComponentConfig: any = {
      primitive: {
        radius: { md: "8px" },
      },
      semantic: {
        modes: { light: {}, dark: {} },
        radius: { md: "{primitive.radius.md}" },
      },
      component: {
        button: {
          radius: "{semantic.radius.nonExistent}",
        },
      },
    };

    expect(() => resolveTokens(brokenComponentConfig)).toThrow(
      /Broken alias in component token/
    );
  });
});
