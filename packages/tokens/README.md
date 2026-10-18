# loom-design-system-tokens

Design tokens for the [Loom Design System](https://github.com/tarunagnihotri534/Loom).

Tokens are structured into three strict layers:
1. **Primitive Layer**: Raw values (colors, spacing, typography, radii, shadows, motion).
2. **Semantic Layer**: Roles and intent (`color.bg.surface`, `color.action.primary`, `color.text.muted`) for light and dark modes.
3. **Component Layer**: Component-specific bindings (`button.radius`, `input.text`, `card.padding`).

Includes compile-time WCAG AA (4.5:1) contrast audit enforcement across light and dark modes.

## Installation

```bash
npm install loom-design-system-tokens
# or
pnpm add loom-design-system-tokens
# or
yarn add loom-design-system-tokens
```

## Usage

### JavaScript / TypeScript

```typescript
import tokens from "loom-design-system-tokens";

console.log(tokens.light["semantic.color.action.primary"]); // "#2563eb"
console.log(tokens.dark["semantic.color.action.primary"]);  // "#2563eb"
```

### JSON Schema

```typescript
import tokensJson from "loom-design-system-tokens/json";
```

## License

[MIT](./LICENSE)
