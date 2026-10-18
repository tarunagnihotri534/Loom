import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, "../src");
const distDir = path.resolve(__dirname, "../dist");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const files = ["reset.css", "tokens.css", "utilities.css"];
let combinedCss = `/**
 * Loom Design System - Complete CSS Bundle
 * Includes reset, generated tokens (:root + .dark), and token-based utilities.
 */\n\n`;

for (const file of files) {
  const srcFile = path.join(srcDir, file);
  if (fs.existsSync(srcFile)) {
    const content = fs.readFileSync(srcFile, "utf-8");
    fs.writeFileSync(path.join(distDir, file), content, "utf-8");
    combinedCss += `/* --- ${file} --- */\n` + content + "\n\n";
    console.log(`  ✓ Copied ${file} to dist/${file}`);
  } else {
    console.warn(`  ⚠ Warning: ${srcFile} not found.`);
  }
}

// Write combined index.css to dist
fs.writeFileSync(path.join(distDir, "index.css"), combinedCss, "utf-8");
console.log("  ✓ Generated dist/index.css bundle");
