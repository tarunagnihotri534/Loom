import { tokensConfig } from "./tokens.config.js";

export type ResolvedTokenMap = Record<string, string | number>;

export interface ResolvedModeTokens {
  mode: "light" | "dark";
  tokens: ResolvedTokenMap;
  cssVariables: Record<string, string | number>;
}

export interface ResolvedSystem {
  primitive: Record<string, string | number>;
  light: ResolvedModeTokens;
  dark: ResolvedModeTokens;
}

/**
 * Gets a nested value from an object using a dot-delimited path (e.g. "color.gray.500")
 */
export function getByPath(obj: any, path: string): any {
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null || typeof current !== "object") {
      return undefined;
    }
    current = current[part];
  }
  return current;
}

/**
 * Converts camelCase to kebab-case (e.g. "primaryBg" -> "primary-bg", "fontSize" -> "font-size")
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Flattens a nested object into dot-delimited key-value pairs
 */
export function flattenObject(
  obj: Record<string, any>,
  prefix = ""
): Record<string, any> {
  const flattened: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      !("$alias" in value)
    ) {
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      flattened[newKey] = value;
    }
  }

  return flattened;
}

const ALIAS_REGEX = /^\{([^}]+)\}$/;

/**
 * Validates and resolves token config according to strict 3-tier layering rules:
 * - Layer 1: Primitive - raw values only, NO aliases allowed.
 * - Layer 2: Semantic - may ONLY reference primitive tokens ({primitive.*}).
 * - Layer 3: Component - may ONLY reference semantic tokens ({semantic.*}).
 */
export function resolveTokens(config = tokensConfig): ResolvedSystem {
  // 1. Validate Primitive layer (no aliases allowed)
  const flattenedPrimitive = flattenObject(config.primitive);
  for (const [key, val] of Object.entries(flattenedPrimitive)) {
    if (typeof val === "string" && ALIAS_REGEX.test(val)) {
      throw new Error(
        `[Layer Rule Violation] Invalid alias in primitive layer: "primitive.${key}" contains alias "${val}". Primitive tokens must be raw values.`
      );
    }
  }

  // Helper to build semantic object for a specific mode
  function getSemanticForMode(mode: "light" | "dark") {
    const { modes, ...modeIndependent } = config.semantic;
    const modeSpecific = modes[mode];
    return {
      ...modeIndependent,
      ...modeSpecific,
    };
  }

  // 2. Resolve for a specific mode ("light" | "dark")
  function resolveForMode(mode: "light" | "dark"): ResolvedModeTokens {
    const semanticTree = getSemanticForMode(mode);
    const flattenedSemantic = flattenObject(semanticTree);
    const resolvedSemantic: Record<string, string | number> = {};

    // Validate & resolve Semantic layer
    for (const [key, val] of Object.entries(flattenedSemantic)) {
      if (typeof val === "string" && ALIAS_REGEX.test(val)) {
        const match = val.match(ALIAS_REGEX);
        const aliasPath = match![1];

        // Layer rule: Semantic may only reference primitive
        if (!aliasPath.startsWith("primitive.")) {
          throw new Error(
            `[Layer Rule Violation] Invalid reference in semantic token "semantic.${key}": "${val}". Semantic tokens may ONLY reference primitive tokens ({primitive.*}).`
          );
        }

        const primitivePath = aliasPath.replace(/^primitive\./, "");
        const resolvedVal = getByPath(config.primitive, primitivePath);

        if (resolvedVal === undefined) {
          throw new Error(
            `[Broken Alias] Broken alias in semantic token "semantic.${key}": reference "${val}" cannot be resolved.`
          );
        }

        resolvedSemantic[`semantic.${key}`] = resolvedVal;
      } else {
        // Semantic tokens that are direct values (if any) or fallback
        resolvedSemantic[`semantic.${key}`] = val;
      }
    }

    // 3. Validate & resolve Component layer
    const flattenedComponent = flattenObject(config.component);
    const resolvedComponent: Record<string, string | number> = {};

    for (const [key, val] of Object.entries(flattenedComponent)) {
      if (typeof val === "string" && ALIAS_REGEX.test(val)) {
        const match = val.match(ALIAS_REGEX);
        const aliasPath = match![1];

        // Layer rule: Component may only reference semantic
        if (aliasPath.startsWith("primitive.")) {
          throw new Error(
            `[Layer Rule Violation] Invalid reference in component token "component.${key}": "${val}". Component tokens may NOT bypass semantic layer to reference primitive tokens.`
          );
        }
        if (!aliasPath.startsWith("semantic.")) {
          throw new Error(
            `[Layer Rule Violation] Invalid reference in component token "component.${key}": "${val}". Component tokens may ONLY reference semantic tokens ({semantic.*}).`
          );
        }

        const resolvedVal = resolvedSemantic[aliasPath];
        if (resolvedVal === undefined) {
          throw new Error(
            `[Broken Alias] Broken alias in component token "component.${key}": reference "${val}" cannot be resolved.`
          );
        }

        resolvedComponent[`component.${key}`] = resolvedVal;
      } else {
        resolvedComponent[`component.${key}`] = val;
      }
    }

    const allTokens: ResolvedTokenMap = {
      ...resolvedSemantic,
      ...resolvedComponent,
    };

    // Format into CSS variables
    const cssVariables: Record<string, string | number> = {};

    for (const [tokenPath, value] of Object.entries(allTokens)) {
      // e.g. "semantic.color.bg.canvas" -> "--loom-color-bg-canvas"
      // e.g. "component.button.primaryBg" -> "--loom-button-primary-bg"
      const cleanPath = tokenPath
        .replace(/^semantic\./, "")
        .replace(/^component\./, "");
      const segments = cleanPath.split(".").map(camelToKebab);
      const varName = `--loom-${segments.join("-")}`;
      cssVariables[varName] = value;
    }

    return {
      mode,
      tokens: allTokens,
      cssVariables,
    };
  }

  return {
    primitive: flattenedPrimitive,
    light: resolveForMode("light"),
    dark: resolveForMode("dark"),
  };
}
