# loom-design-system-css

CSS variables, baseline reset, and utility classes for the [Loom Design System](https://github.com/tarunagnihotri534/Loom).

Includes:
- **`tokens.css`**: `:root` and `.dark` mode CSS custom properties generated from `loom-design-system-tokens`.
- **`reset.css`**: Modern baseline CSS reset.
- **`utilities.css`**: Token-bound utility classes (colors, typography scale, spacing, radii, shadows).
- **`index.css`**: Complete bundled entry point.

## Installation

```bash
npm install loom-design-system-css
# or
pnpm add loom-design-system-css
# or
yarn add loom-design-system-css
```

## Usage

### Complete Bundle

Import the complete stylesheet (reset + tokens + utilities) in your app entry point:

```typescript
import "loom-design-system-css";
```

### Modular Imports

You can also import individual parts:

```typescript
// Only tokens (:root and .dark CSS variables)
import "loom-design-system-css/tokens.css";

// Only reset
import "loom-design-system-css/reset.css";

// Only utilities
import "loom-design-system-css/utilities.css";
```

## License

[MIT](./LICENSE)
