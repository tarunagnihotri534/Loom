import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "../src/components/Card/Card.js";

describe("Loom Card Component", () => {
  it("renders card content in default div container", () => {
    render(<Card>Card body text</Card>);
    const card = screen.getByText(/card body text/i);

    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("loom-card");
    expect(card).not.toHaveClass("loom-card--interactive");
    expect(card.tagName).toBe("DIV");
  });

  it("renders as custom semantic HTML element", () => {
    render(<Card as="article">Article Card</Card>);
    const card = screen.getByText(/article card/i);

    expect(card.tagName).toBe("ARTICLE");
  });

  it("handles interactive mode with keyboard Space and Enter activations", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Card interactive onClick={handleClick}>
        Interactive Card
      </Card>
    );
    const card = screen.getByRole("button", { name: /interactive card/i });

    expect(card).toHaveClass("loom-card--interactive");
    expect(card).toHaveAttribute("tabindex", "0");

    // Click
    await user.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Keyboard activation with Space
    card.focus();
    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(2);

    // Keyboard activation with Enter
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it("forwards ref to container element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref Card</Card>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe("DIV");
  });
});
