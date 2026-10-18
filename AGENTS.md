# Loom AI Agent Guidelines

This document outlines mandatory architectural constraints and rules for all AI agents contributing to the Loom codebase.

---

## 1. Single Source of Truth

- **`packages/tokens/src/tokens.config.ts`** is the **ONLY** source of truth for design tokens.
- Never define standalone constants or hardcoded palette values elsewhere.

---

## 2. Strict 3-Tier Layering Rules

Agents must respect the three-layer token hierarchy:
1. **Primitive Layer (`primitive.*`)**:
   - Contains raw values only (hex strings, rem sizes, cubic-bezier curves).
   - **MUST NOT** reference any other tokens or use `{...}` alias syntax.
2. **Semantic Layer (`semantic.*`)**:
   - Encapsulates roles and intent (`color.bg.surface`, `color.action.primary`, `color.text.muted`).
   - Supports light and dark mode variations.
   - **MUST ONLY** reference primitive tokens: `{primitive.<path>}`.
   - Never reference another semantic token or a component token.
3. **Component Layer (`component.*`)**:
   - Defines bindings for specific components (`button.radius`, `button.primaryBg`, `input.text`).
   - **MUST ONLY** reference semantic tokens: `{semantic.<path>}`.
   - **STRICT PROHIBITION**: Never bypass the semantic layer to reference `{primitive.*}` directly.

Any layer violation fails the build immediately in `packages/tokens/src/resolve.ts`.

---

## 3. Zero Hardcoded Values in Components

- All CSS rules and inline styles in `packages/react`, `packages/css`, and `apps/docs` must consume Loom CSS variables: `var(--loom-...)`.
- **FORBIDDEN**:
  ```css
  /* ❌ NEVER DO THIS */
  .custom-button {
    background-color: #2563eb;
    border-radius: 8px;
    padding: 8px 16px;
  }
  ```
- **REQUIRED**:
  ```css
  /* ✓ ALWAYS USE TOKENS */
  .custom-button {
    background-color: var(--loom-button-primary-bg);
    border-radius: var(--loom-button-radius);
    padding: var(--loom-button-padding-y) var(--loom-button-padding-x);
  }
  ```
- If a token does not exist, add it to `tokens.config.ts` following the 3-tier layering rules and re-run `pnpm run build`.

---

## 4. Never Edit Generated Files Directly

The following files are generated automatically:
- `packages/css/src/tokens.css`
- `packages/tokens/dist/tokens.json`
- `packages/tokens/dist/tokens.d.ts`

**Never modify these files by hand.** Edit `packages/tokens/src/tokens.config.ts` and run `pnpm run build`. CI checks for drift using:
```bash
pnpm run check:generated
```

---

## 5. Accessibility & Contrast (WCAG AA)

- Every text and background color pair must achieve a contrast ratio of at least **4.5:1** in both light and dark modes.
- Every interactive element must provide:
  - Accessible name (`aria-label`, visible text, or `aria-labelledby`).
  - Visible focus indicator via `:focus-visible` using `--loom-button-focus-ring` or `--loom-color-border-focus`.
  - Keyboard activation support (Space / Enter).
  - Validation states communicated via `aria-invalid` and `aria-disabled`.

---

## 6. Verification Steps Before Finishing Work

Whenever making changes:
1. Run `pnpm run build` &rarr; verify token generation and zero compilation errors.
2. Run `pnpm run test` &rarr; ensure all Vitest unit tests pass.
3. Run `pnpm run check:generated` &rarr; verify generated files match committed code.
