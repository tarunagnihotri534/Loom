import { defineConfig } from "tsup";
import * as fs from "node:fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  onSuccess: async () => {
    if (fs.existsSync("src/styles.css")) {
      fs.copyFileSync("src/styles.css", "dist/styles.css");
      console.log("  ✓ Copied src/styles.css to dist/styles.css");
    }
  },
});
