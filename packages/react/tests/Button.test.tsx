import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../src/components/Button/Button.js";

describe("Loom Button Component", () => {
  it("renders with default primary variant and md size", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("loom-button");
    expect(button).toHaveClass("loom-button--primary");
    expect(button).toHaveClass("loom-button--md");
  });

  it("applies subtle variant and size classes", () => {
    render(
      <Button variant="subtle" size="lg">
        Subtle Action
      </Button>
    );
    const button = screen.getByRole("button", { name: /subtle action/i });

    expect(button).toHaveClass("loom-button--subtle");
    expect(button).toHaveClass("loom-button--lg");
  });

  it("handles click and keyboard activations (Space & Enter)", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Submit</Button>);
    const button = screen.getByRole("button", { name: /submit/i });

    // Click
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Keyboard activation with Space
    button.focus();
    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(2);

    // Keyboard activation with Enter
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it("handles disabled state and prevents clicks", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    const button = screen.getByRole("button", { name: /disabled/i });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("forwards ref to button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe("BUTTON");
  });
});
