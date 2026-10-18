import React, { forwardRef } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the card is interactive (clickable, hover effect, focusable) */
  interactive?: boolean;
  /** HTML element to render */
  as?: "div" | "article" | "section";
  /** Children elements */
  children?: React.ReactNode;
}

/**
 * Loom Card Component
 * Container component built strictly using Loom tokens.
 * Supports static and interactive variants with keyboard triggers.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      interactive = false,
      as: Component = "div",
      className = "",
      onClick,
      onKeyDown,
      role,
      tabIndex,
      children,
      ...rest
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (interactive && onClick) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }
      onKeyDown?.(e);
    };

    const classNames = [
      "loom-card",
      interactive ? "loom-card--interactive" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const computedRole = role ?? (interactive ? "button" : undefined);
    const computedTabIndex = tabIndex ?? (interactive ? 0 : undefined);

    return (
      <Component
        ref={ref}
        role={computedRole}
        tabIndex={computedTabIndex}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={classNames}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";
