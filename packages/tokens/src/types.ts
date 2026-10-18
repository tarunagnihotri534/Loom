export type PrimitiveValue = string | number;

export interface TokenAlias {
  $alias: string;
}

export interface ContrastPair {
  name: string;
  foreground: string; // Token path or CSS variable reference, e.g. "color.text.primary" or "button.primary.text"
  background: string; // Token path or CSS variable reference, e.g. "color.bg.surface" or "button.primary.bg"
  minRatio?: number; // default 4.5
}

export interface TokenAuditResult {
  pair: ContrastPair;
  mode: "light" | "dark";
  fgColor: string;
  bgColor: string;
  contrastRatio: number;
  passed: boolean;
  requiredRatio: number;
}
