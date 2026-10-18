# loom-design-system-react

Accessible React UI components built strictly with Loom design tokens for the [Loom Design System](https://github.com/tarunagnihotri534/Loom).

Includes:
- **`Button`**: Interactive button supporting `primary` and `subtle` variants, sizes (`sm`, `md`, `lg`), visible focus ring, and disabled states.
- **`Input`**: Text input with size variants, validation states (`invalid`, `aria-invalid`), and visible focus indicator.
- **`Card`**: Surface card container supporting static and interactive variants with hover elevation and keyboard Space/Enter triggers.

## Installation

```bash
npm install loom-design-system-react loom-design-system-css
# or
pnpm add loom-design-system-react loom-design-system-css
# or
yarn add loom-design-system-react loom-design-system-css
```

> **Peer Dependencies**: Requires `react` >= 18.0.0 and `react-dom` >= 18.0.0.

## Importing Styles

All components consume Loom design tokens. Consumers must import both the base token CSS and component styles in their application root (e.g. `main.tsx` or `_app.tsx`):

```typescript
// 1. Import Loom design tokens, reset, and utilities
import "loom-design-system-css";

// 2. Import React component styles
import "loom-design-system-react/styles.css";
```

## Usage Example

```tsx
import React, { useState } from "react";
import "loom-design-system-css";
import "loom-design-system-react/styles.css";
import { Button, Input, Card } from "loom-design-system-react";

export function App() {
  const [name, setName] = useState("");

  return (
    <Card interactive onClick={() => console.log("Card clicked")}>
      <h3>Sign Up</h3>
      <Input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        invalid={name.length > 0 && name.length < 3}
      />
      <div style={{ marginTop: "1rem" }}>
        <Button variant="primary" onClick={() => alert(`Hello, ${name}!`)}>
          Submit
        </Button>
      </div>
    </Card>
  );
}
```

## License

[MIT](./LICENSE)
