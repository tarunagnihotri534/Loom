import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgDir = path.resolve(__dirname, "..");
const rootDir = path.resolve(pkgDir, "../..");
const distDir = path.join(pkgDir, "dist");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Run tsup to compile TS to ESM, CJS, and DTS
console.log("📦 [loom-design-system] Compiling TypeScript bundle...");
execSync("npx tsup", { cwd: pkgDir, stdio: "inherit" });

// 2. Combine all CSS into dist/styles.css and dist/index.css
console.log("🎨 [loom-design-system] Bundling unified CSS...");
const cssPkgDist = path.join(rootDir, "packages", "css", "dist");
const reactPkgDist = path.join(rootDir, "packages", "react", "dist");
const tokensPkgDist = path.join(rootDir, "packages", "tokens", "dist");

const resetCss = fs.readFileSync(path.join(cssPkgDist, "reset.css"), "utf-8");
const tokensCss = fs.readFileSync(path.join(cssPkgDist, "tokens.css"), "utf-8");
const utilitiesCss = fs.readFileSync(path.join(cssPkgDist, "utilities.css"), "utf-8");
const componentCss = fs.readFileSync(path.join(reactPkgDist, "styles.css"), "utf-8");

const banner = `/**\n * Loom Design System Unified Bundle (v0.1.0)\n * Tokens, Reset, Utilities, and Accessible Component Styles\n */\n\n`;
const unifiedCss = banner + [tokensCss, resetCss, utilitiesCss, componentCss].join("\n\n");

fs.writeFileSync(path.join(distDir, "styles.css"), unifiedCss, "utf-8");
fs.writeFileSync(path.join(distDir, "index.css"), unifiedCss, "utf-8");
fs.writeFileSync(path.join(distDir, "tokens.css"), tokensCss, "utf-8");
fs.writeFileSync(path.join(distDir, "reset.css"), resetCss, "utf-8");
fs.writeFileSync(path.join(distDir, "utilities.css"), utilitiesCss, "utf-8");
console.log("  ✓ Generated dist/styles.css & dist/index.css");

// 3. Copy tokens.json
if (fs.existsSync(path.join(tokensPkgDist, "tokens.json"))) {
  fs.copyFileSync(
    path.join(tokensPkgDist, "tokens.json"),
    path.join(distDir, "tokens.json")
  );
  console.log("  ✓ Copied tokens.json to dist/tokens.json");
}

console.log("✨ [loom-design-system] Build complete!");
