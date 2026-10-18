import React, { forwardRef } from "react";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Size variant of the input */
  size?: InputSize;
  /** Whether the input value is invalid */
  invalid?: boolean;
}

/**
 * Loom Input Component
 * Built using ONLY Loom design tokens. Supports keyboard interaction,
 * visible focus styles, and ARIA attributes for validation.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      invalid = false,
      disabled = false,
      className = "",
      type = "text",
      "aria-invalid": ariaInvalidProp,
      ...rest
    },
    ref
  ) => {
    const isInvalid = invalid || ariaInvalidProp === true || ariaInvalidProp === "true";

    const classNames = [
      "loom-input",
      `loom-input--${size}`,
      isInvalid ? "loom-input--invalid" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        aria-disabled={disabled ? "true" : undefined}
        aria-invalid={isInvalid ? "true" : undefined}
        className={classNames}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
