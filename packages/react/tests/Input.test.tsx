import React, { createRef } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../src/components/Input/Input.js";

describe("Loom Input Component", () => {
  it("renders with default attributes and md size", () => {
    render(<Input placeholder="Enter username" />);
    const input = screen.getByPlaceholderText(/enter username/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("loom-input");
    expect(input).toHaveClass("loom-input--md");
    expect(input).not.toHaveClass("loom-input--invalid");
  });

  it("applies invalid class and aria-invalid when invalid is true", () => {
    render(<Input invalid placeholder="Email" aria-describedby="email-error" />);
    const input = screen.getByPlaceholderText(/email/i);

    expect(input).toHaveClass("loom-input--invalid");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
  });

  it("handles user typing correctly", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText(/type here/i) as HTMLInputElement;

    await user.type(input, "Hello Loom");
    expect(input.value).toBe("Hello Loom");
  });

  it("disables input correctly with aria-disabled", () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText(/disabled input/i);

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");
  });

  it("forwards ref to input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref test" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe("INPUT");
  });
});
