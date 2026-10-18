# loom-design-system

The unified, all-in-one package for the **Loom Design System**: weaving design tokens, modern CSS, and accessible React components into a single package.

---

## Installation

```bash
npm install loom-design-system react react-dom
# or
pnpm add loom-design-system react react-dom
# or
yarn add loom-design-system react react-dom
```

---

## Quick Start

### 1. Import Styles
Import the complete stylesheet (includes design tokens, modern reset, utility classes, and component styles):

```tsx
import "loom-design-system/styles.css";
```

### 2. Use React Components
All accessible UI components are exported directly from the package root:

```tsx
import React, { useState } from "react";
import { Button, Input, Card } from "loom-design-system";

export function App() {
  const [query, setQuery] = useState("");

  return (
    <Card variant="elevated">
      <Input
        label="Search components"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type something..."
      />
      <Button variant="primary" onClick={() => alert(query)}>
        Search
      </Button>
    </Card>
  );
}
```

---

## Token Access

Need programmatic access to Loom design tokens?

```ts
import { tokens } from "loom-design-system/tokens";

console.log(tokens.light["semantic.color.action.primary"]);
```

Or import raw token JSON directly:

```json
import tokensJson from "loom-design-system/tokens.json";
```

---

## Features

- **All-in-One**: One package gives you tokens, CSS custom properties, modern reset, and accessible React components.
- **3-Tier Token Architecture**: Primitive &rarr; Semantic &rarr; Component layers.
- **WCAG AA Contrast Validated**: Compile-time 4.5:1 color contrast ratio guarantee in both light and dark modes.
- **Fully Accessible**: WCAG compliant focus rings, keyboard activation (Space/Enter), and ARIA validation.
- **Zero Runtime CSS**: Pure standard CSS custom properties with zero runtime JavaScript CSS overhead.
- **TypeScript First**: Full type definitions for all components, props, and design tokens.

---

## License

MIT © [Tarun Agnihotri](https://github.com/tarunagnihotri534)
