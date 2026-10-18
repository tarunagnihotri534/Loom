import React, { forwardRef } from "react";

export type ButtonVariant = "primary" | "subtle";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size variant of the button */
  size?: ButtonSize;
  /** Whether the button is in a disabled state */
  disabled?: boolean;
  /** Children elements */
  children?: React.ReactNode;
}

/**
 * Loom Button Component
 * Built using ONLY Loom design tokens. Supports keyboard interaction,
 * visible focus styles, and standard ARIA attributes.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      disabled = false,
      type = "button",
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const classNames = [
      "loom-button",
      `loom-button--${variant}`,
      `loom-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-disabled={disabled ? "true" : undefined}
        className={classNames}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
