import { ContrastPair } from "./types.js";

export const tokensConfig = {
  // LAYER 1: PRIMITIVE (Raw values only, never references other tokens)
  primitive: {
    color: {
      white: "#ffffff",
      black: "#000000",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        950: "#450a0a",
      },
    },
    typography: {
      fontFamily: {
        sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      lineHeight: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.625",
      },
    },
    spacing: {
      0: "0px",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
    },
    radius: {
      none: "0px",
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      full: "9999px",
    },
    shadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    },
    motion: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
      },
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      },
    },
    zIndex: {
      auto: "auto",
      base: "0",
      dropdown: "1000",
      sticky: "1100",
      modal: "1300",
      tooltip: "1500",
    },
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },

  // LAYER 2: SEMANTIC (Roles & intent, references ONLY {primitive.*})
  semantic: {
    // Mode-specific color and shadow tokens
    modes: {
      light: {
        color: {
          bg: {
            canvas: "{primitive.color.gray.50}",
            surface: "{primitive.color.white}",
            subtle: "{primitive.color.gray.100}",
          },
          text: {
            primary: "{primitive.color.gray.900}",
            secondary: "{primitive.color.gray.700}",
            muted: "{primitive.color.gray.600}",
            inverse: "{primitive.color.white}",
          },
          border: {
            default: "{primitive.color.gray.200}",
            muted: "{primitive.color.gray.100}",
            focus: "{primitive.color.blue.600}",
          },
          action: {
            primary: "{primitive.color.blue.600}",
            primaryHover: "{primitive.color.blue.700}",
            primaryActive: "{primitive.color.blue.800}",
            primaryText: "{primitive.color.white}",
            subtle: "{primitive.color.gray.100}",
            subtleHover: "{primitive.color.gray.200}",
            subtleText: "{primitive.color.gray.900}",
          },
          feedback: {
            error: "{primitive.color.red.700}",
            errorBg: "{primitive.color.red.50}",
            errorText: "{primitive.color.red.800}",
          },
        },
        shadow: {
          surface: "{primitive.shadow.sm}",
          elevated: "{primitive.shadow.md}",
          overlay: "{primitive.shadow.lg}",
        },
      },
      dark: {
        color: {
          bg: {
            canvas: "{primitive.color.gray.950}",
            surface: "{primitive.color.gray.900}",
            subtle: "{primitive.color.gray.800}",
          },
          text: {
            primary: "{primitive.color.gray.50}",
            secondary: "{primitive.color.gray.300}",
            muted: "{primitive.color.gray.400}",
            inverse: "{primitive.color.gray.950}",
          },
          border: {
            default: "{primitive.color.gray.700}",
            muted: "{primitive.color.gray.800}",
            focus: "{primitive.color.blue.500}",
          },
          action: {
            primary: "{primitive.color.blue.600}",
            primaryHover: "{primitive.color.blue.700}",
            primaryActive: "{primitive.color.blue.800}",
            primaryText: "{primitive.color.white}",
            subtle: "{primitive.color.gray.800}",
            subtleHover: "{primitive.color.gray.700}",
            subtleText: "{primitive.color.gray.50}",
          },
          feedback: {
            error: "{primitive.color.red.500}",
            errorBg: "{primitive.color.red.950}",
            errorText: "{primitive.color.red.100}",
          },
        },
        shadow: {
          surface: "{primitive.shadow.sm}",
          elevated: "{primitive.shadow.md}",
          overlay: "{primitive.shadow.lg}",
        },
      },
    },

    // Mode-independent semantic tokens (references ONLY {primitive.*})
    typography: {
      fontFamily: {
        sans: "{primitive.typography.fontFamily.sans}",
        mono: "{primitive.typography.fontFamily.mono}",
      },
      fontSize: {
        xs: "{primitive.typography.fontSize.xs}",
        sm: "{primitive.typography.fontSize.sm}",
        base: "{primitive.typography.fontSize.base}",
        lg: "{primitive.typography.fontSize.lg}",
        xl: "{primitive.typography.fontSize.xl}",
        "2xl": "{primitive.typography.fontSize.2xl}",
      },
      fontWeight: {
        regular: "{primitive.typography.fontWeight.regular}",
        medium: "{primitive.typography.fontWeight.medium}",
        semibold: "{primitive.typography.fontWeight.semibold}",
        bold: "{primitive.typography.fontWeight.bold}",
      },
      lineHeight: {
        tight: "{primitive.typography.lineHeight.tight}",
        normal: "{primitive.typography.lineHeight.normal}",
        relaxed: "{primitive.typography.lineHeight.relaxed}",
      },
    },
    spacing: {
      0: "{primitive.spacing.0}",
      1: "{primitive.spacing.1}",
      2: "{primitive.spacing.2}",
      3: "{primitive.spacing.3}",
      4: "{primitive.spacing.4}",
      5: "{primitive.spacing.5}",
      6: "{primitive.spacing.6}",
      8: "{primitive.spacing.8}",
      10: "{primitive.spacing.10}",
      12: "{primitive.spacing.12}",
    },
    radius: {
      none: "{primitive.radius.none}",
      sm: "{primitive.radius.sm}",
      md: "{primitive.radius.md}",
      lg: "{primitive.radius.lg}",
      full: "{primitive.radius.full}",
    },
    motion: {
      duration: {
        fast: "{primitive.motion.duration.fast}",
        normal: "{primitive.motion.duration.normal}",
        slow: "{primitive.motion.duration.slow}",
      },
      easing: {
        easeInOut: "{primitive.motion.easing.easeInOut}",
        easeOut: "{primitive.motion.easing.easeOut}",
      },
    },
    zIndex: {
      auto: "{primitive.zIndex.auto}",
      base: "{primitive.zIndex.base}",
      dropdown: "{primitive.zIndex.dropdown}",
      sticky: "{primitive.zIndex.sticky}",
      modal: "{primitive.zIndex.modal}",
      tooltip: "{primitive.zIndex.tooltip}",
    },
    breakpoints: {
      sm: "{primitive.breakpoints.sm}",
      md: "{primitive.breakpoints.md}",
      lg: "{primitive.breakpoints.lg}",
      xl: "{primitive.breakpoints.xl}",
    },
  },

  // LAYER 3: COMPONENT (Component-specific bindings, references ONLY {semantic.*})
  component: {
    button: {
      radius: "{semantic.radius.md}",
      paddingX: "{semantic.spacing.4}",
      paddingY: "{semantic.spacing.2}",
      fontFamily: "{semantic.typography.fontFamily.sans}",
      fontSize: "{semantic.typography.fontSize.sm}",
      fontWeight: "{semantic.typography.fontWeight.medium}",
      lineHeight: "{semantic.typography.lineHeight.normal}",
      transitionDuration: "{semantic.motion.duration.fast}",
      transitionEasing: "{semantic.motion.easing.easeInOut}",
      primaryBg: "{semantic.color.action.primary}",
      primaryBgHover: "{semantic.color.action.primaryHover}",
      primaryBgActive: "{semantic.color.action.primaryActive}",
      primaryText: "{semantic.color.action.primaryText}",
      primaryBorder: "{semantic.color.action.primary}",
      subtleBg: "{semantic.color.action.subtle}",
      subtleBgHover: "{semantic.color.action.subtleHover}",
      subtleText: "{semantic.color.action.subtleText}",
      subtleBorder: "{semantic.color.border.default}",
      focusRing: "{semantic.color.border.focus}",
    },
    input: {
      radius: "{semantic.radius.md}",
      paddingX: "{semantic.spacing.3}",
      paddingY: "{semantic.spacing.2}",
      fontFamily: "{semantic.typography.fontFamily.sans}",
      fontSize: "{semantic.typography.fontSize.sm}",
      lineHeight: "{semantic.typography.lineHeight.normal}",
      transitionDuration: "{semantic.motion.duration.fast}",
      transitionEasing: "{semantic.motion.easing.easeInOut}",
      bg: "{semantic.color.bg.surface}",
      text: "{semantic.color.text.primary}",
      placeholder: "{semantic.color.text.muted}",
      border: "{semantic.color.border.default}",
      borderFocus: "{semantic.color.border.focus}",
    },
    card: {
      radius: "{semantic.radius.lg}",
      padding: "{semantic.spacing.6}",
      bg: "{semantic.color.bg.surface}",
      border: "{semantic.color.border.default}",
      shadow: "{semantic.shadow.surface}",
    },
  },
};

// Required WCAG AA (4.5:1) Contrast Audit Pairs
export const contrastAuditPairs: ContrastPair[] = [
  {
    name: "Text Primary on Canvas Background",
    foreground: "semantic.color.text.primary",
    background: "semantic.color.bg.canvas",
  },
  {
    name: "Text Primary on Surface Background",
    foreground: "semantic.color.text.primary",
    background: "semantic.color.bg.surface",
  },
  {
    name: "Text Secondary on Surface Background",
    foreground: "semantic.color.text.secondary",
    background: "semantic.color.bg.surface",
  },
  {
    name: "Text Muted on Surface Background",
    foreground: "semantic.color.text.muted",
    background: "semantic.color.bg.surface",
  },
  {
    name: "Button Primary Text on Primary Action Background",
    foreground: "component.button.primaryText",
    background: "component.button.primaryBg",
  },
  {
    name: "Button Primary Text on Primary Action Hover",
    foreground: "component.button.primaryText",
    background: "component.button.primaryBgHover",
  },
  {
    name: "Button Subtle Text on Subtle Action Background",
    foreground: "component.button.subtleText",
    background: "component.button.subtleBg",
  },
  {
    name: "Input Text on Input Background",
    foreground: "component.input.text",
    background: "component.input.bg",
  },
  {
    name: "Error Text on Error Background",
    foreground: "semantic.color.feedback.errorText",
    background: "semantic.color.feedback.errorBg",
  },
];
