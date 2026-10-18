import React, { useState, useEffect } from "react";
import { Button, Input, Card } from "loom-design-system-react";

export function App() {
  const [isDark, setIsDark] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cardClicks, setCardClicks] = useState(0);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="docs-container">
      {/* Header */}
      <header className="docs-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--loom-spacing-3)" }}>
            <h1 style={{ margin: 0, fontSize: "var(--loom-typography-font-size-2xl)", fontWeight: "var(--loom-typography-font-weight-bold)" }}>
              Loom Design System
            </h1>
            <span className="docs-badge docs-badge--success">WCAG AA Compliant</span>
          </div>
          <p style={{ margin: "var(--loom-spacing-1) 0 0 0", color: "var(--loom-color-text-secondary)", fontSize: "var(--loom-typography-font-size-sm)" }}>
            Single source of truth token architecture (Primitive &rarr; Semantic &rarr; Component)
          </p>
        </div>
        <Button
          variant="subtle"
          onClick={() => setIsDark((prev) => !prev)}
          aria-label="Toggle dark mode"
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </Button>
      </header>

      {/* SECTION 1: Token Showcase */}
      <section className="docs-section">
        <h2 className="docs-section-title">Design Tokens</h2>
        <p className="docs-section-desc">
          Generated automatically from <code>tokens.config.ts</code> into CSS custom properties, TypeScript types, and JSON.
        </p>

        {/* Color Swatches */}
        <h3 style={{ fontSize: "var(--loom-typography-font-size-lg)", marginBottom: "var(--loom-spacing-3)" }}>
          1. Semantic Colors &amp; Contrast AA
        </h3>
        <div className="docs-grid" style={{ marginBottom: "var(--loom-spacing-6)" }}>
          <div className="swatch-card">
            <div className="swatch-box" style={{ backgroundColor: "var(--loom-color-bg-canvas)", border: "1px solid var(--loom-color-border-default)" }} />
            <div className="swatch-title">Canvas Background</div>
            <div className="swatch-meta">--loom-color-bg-canvas</div>
          </div>
          <div className="swatch-card">
            <div className="swatch-box" style={{ backgroundColor: "var(--loom-color-bg-surface)", border: "1px solid var(--loom-color-border-default)" }} />
            <div className="swatch-title">Surface Background</div>
            <div className="swatch-meta">--loom-color-bg-surface</div>
          </div>
          <div className="swatch-card">
            <div className="swatch-box" style={{ backgroundColor: "var(--loom-color-action-primary)" }} />
            <div className="swatch-title">Action Primary</div>
            <div className="swatch-meta">--loom-color-action-primary</div>
          </div>
          <div className="swatch-card">
            <div className="swatch-box" style={{ backgroundColor: "var(--loom-color-feedback-error)" }} />
            <div className="swatch-title">Feedback Error</div>
            <div className="swatch-meta">--loom-color-feedback-error</div>
          </div>
        </div>

        {/* Typography Scale */}
        <h3 style={{ fontSize: "var(--loom-typography-font-size-lg)", marginBottom: "var(--loom-spacing-3)" }}>
          2. Type Scale
        </h3>
        <div className="docs-state-grid" style={{ flexDirection: "column", alignItems: "flex-start", gap: "var(--loom-spacing-3)" }}>
          <div style={{ fontSize: "var(--loom-typography-font-size-2xl)", fontWeight: "var(--loom-typography-font-weight-bold)" }}>
            2xl (1.5rem / 24px) &mdash; Heading 1
          </div>
          <div style={{ fontSize: "var(--loom-typography-font-size-xl)", fontWeight: "var(--loom-typography-font-weight-semibold)" }}>
            xl (1.25rem / 20px) &mdash; Heading 2
          </div>
          <div style={{ fontSize: "var(--loom-typography-font-size-lg)", fontWeight: "var(--loom-typography-font-weight-medium)" }}>
            lg (1.125rem / 18px) &mdash; Subtitle / Lead
          </div>
          <div style={{ fontSize: "var(--loom-typography-font-size-base)" }}>
            base (1rem / 16px) &mdash; Body text default
          </div>
          <div style={{ fontSize: "var(--loom-typography-font-size-sm)", color: "var(--loom-color-text-secondary)" }}>
            sm (0.875rem / 14px) &mdash; Secondary captions and input labels
          </div>
          <div style={{ fontSize: "var(--loom-typography-font-size-xs)", color: "var(--loom-color-text-muted)" }}>
            xs (0.75rem / 12px) &mdash; Metadata badges and fine print
          </div>
        </div>

        {/* Spacing Scale */}
        <h3 style={{ fontSize: "var(--loom-typography-font-size-lg)", marginBottom: "var(--loom-spacing-3)" }}>
          3. Spacing Scale
        </h3>
        <div className="docs-state-grid" style={{ flexDirection: "column", alignItems: "flex-start", gap: "var(--loom-spacing-2)" }}>
          {[
            { token: "--loom-spacing-1", label: "space-1 (4px)", size: "4px" },
            { token: "--loom-spacing-2", label: "space-2 (8px)", size: "8px" },
            { token: "--loom-spacing-3", label: "space-3 (12px)", size: "12px" },
            { token: "--loom-spacing-4", label: "space-4 (16px)", size: "16px" },
            { token: "--loom-spacing-6", label: "space-6 (24px)", size: "24px" },
            { token: "--loom-spacing-8", label: "space-8 (32px)", size: "32px" },
          ].map((item) => (
            <div key={item.token} style={{ display: "flex", alignItems: "center", width: "100%", gap: "var(--loom-spacing-4)" }}>
              <span style={{ width: "130px", fontFamily: "var(--loom-typography-font-family-mono)", fontSize: "var(--loom-typography-font-size-xs)", color: "var(--loom-color-text-secondary)" }}>
                {item.label}
              </span>
              <div
                style={{
                  height: "20px",
                  width: `var(${item.token})`,
                  backgroundColor: "var(--loom-color-action-primary)",
                  borderRadius: "var(--loom-radius-sm)",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Components in All States */}
      <section className="docs-section">
        <h2 className="docs-section-title">Components (Token-Bound)</h2>
        <p className="docs-section-desc">
          Built using <strong>only</strong> Loom tokens with keyboard support, visible focus rings, and full ARIA support.
        </p>

        {/* Button Component */}
        <div style={{ marginBottom: "var(--loom-spacing-8)" }}>
          <h3 style={{ fontSize: "var(--loom-typography-font-size-lg)", marginBottom: "var(--loom-spacing-3)" }}>
            Button States &amp; Sizes
          </h3>
          <div className="docs-state-grid">
            <Button variant="primary" size="sm">Primary Small</Button>
            <Button variant="primary" size="md">Primary Medium</Button>
            <Button variant="primary" size="lg">Primary Large</Button>
            <Button variant="subtle" size="md">Subtle Variant</Button>
            <Button variant="primary" disabled>Disabled State</Button>
          </div>
        </div>

        {/* Input Component */}
        <div style={{ marginBottom: "var(--loom-spacing-8)" }}>
          <h3 style={{ fontSize: "var(--loom-typography-font-size-lg)", marginBottom: "var(--loom-spacing-3)" }}>
            Input States &amp; Sizes
          </h3>
          <div className="docs-grid" style={{ marginBottom: "var(--loom-spacing-4)" }}>
            <div>
              <label style={{ display: "block", fontSize: "var(--loom-typography-font-size-xs)", marginBottom: "var(--loom-spacing-1)", color: "var(--loom-color-text-secondary)" }}>
                Default (size: sm)
              </label>
              <Input size="sm" placeholder="Small input..." />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "var(--loom-typography-font-size-xs)", marginBottom: "var(--loom-spacing-1)", color: "var(--loom-color-text-secondary)" }}>
                Default (size: md)
              </label>
              <Input size="md" placeholder="Medium input..." />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "var(--loom-typography-font-size-xs)", marginBottom: "var(--loom-spacing-1)", color: "var(--loom-color-text-secondary)" }}>
                Invalid State (aria-invalid)
              </label>
              <Input invalid placeholder="Invalid value..." defaultValue="bad-email@loom" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "var(--loom-typography-font-size-xs)", marginBottom: "var(--loom-spacing-1)", color: "var(--loom-color-text-secondary)" }}>
                Disabled State
              </label>
              <Input disabled placeholder="Cannot edit" defaultValue="Read only value" />
            </div>
          </div>

          <div style={{ padding: "var(--loom-spacing-4)", backgroundColor: "var(--loom-color-bg-surface)", border: "1px solid var(--loom-color-border-default)", borderRadius: "var(--loom-radius-md)" }}>
            <label style={{ display: "block", fontSize: "var(--loom-typography-font-size-sm)", fontWeight: "var(--loom-typography-font-weight-medium)", marginBottom: "var(--loom-spacing-2)" }}>
              Interactive Live Input:
            </label>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type to test live binding..."
            />
            {inputValue && (
              <p style={{ marginTop: "var(--loom-spacing-2)", fontSize: "var(--loom-typography-font-size-sm)", color: "var(--loom-color-action-primary)" }}>
                Current value: <strong>{inputValue}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Card Component */}
        <div>
          <h3 style={{ fontSize: "var(--loom-typography-font-size-lg)", marginBottom: "var(--loom-spacing-3)" }}>
            Card Variants
          </h3>
          <div className="docs-grid">
            <Card>
              <h4 style={{ margin: "0 0 var(--loom-spacing-2) 0", fontSize: "var(--loom-typography-font-size-base)", fontWeight: "var(--loom-typography-font-weight-semibold)" }}>
                Static Surface Card
              </h4>
              <p style={{ margin: 0, fontSize: "var(--loom-typography-font-size-sm)", color: "var(--loom-color-text-secondary)" }}>
                Standard container applying <code>var(--loom-card-bg)</code>, border, and elevation tokens.
              </p>
            </Card>

            <Card
              interactive
              onClick={() => setCardClicks((c) => c + 1)}
              aria-label="Interactive test card"
            >
              <h4 style={{ margin: "0 0 var(--loom-spacing-2) 0", fontSize: "var(--loom-typography-font-size-base)", fontWeight: "var(--loom-typography-font-weight-semibold)" }}>
                Interactive Card (Click or Press Space/Enter)
              </h4>
              <p style={{ margin: 0, fontSize: "var(--loom-typography-font-size-sm)", color: "var(--loom-color-text-secondary)" }}>
                Features hover elevation, visible focus ring, and keyboard trigger. Activations: <strong>{cardClicks}</strong>
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
