import { render, screen } from "@testing-library/react";

import { Button } from "../Button";
import { capitalize } from "@/utils/capitalize";

describe("Button", () => {
  it("should render correctly", () => {
    render(<Button className="test-class">Click</Button>);

    const button = screen.getByRole("button", { name: "Click" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("test-class");
  });

  it("should render with correct html tag", () => {
    render(<Button as="button">Click</Button>);
    render(<Button as="a" href="#">Click</Button>);
    render(<Button as="div" data-testid="div">Div button</Button>);

    const button = screen.getByRole("button", { name: "Click" });
    const buttonLink = screen.getByRole("link", { name: "Click" });
    const buttonDiv = screen.getByTestId("div");

    expect(button).toBeInTheDocument();
    expect(buttonLink).toBeInTheDocument();
    expect(buttonDiv).toBeInTheDocument();
    expect(buttonDiv).toHaveRole("generic");
  });

  describe("should render with correct variant", () => {
    it.each(["large", "medium"] as const)("size = %s", (size) => {
      render(<Button size={size} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(new RegExp(`button${capitalize(size)}`));
    });

    it.each(["accent", "success", "error"] as const)("color = %s", (color) => {
      render(<Button color={color} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(new RegExp(`button${capitalize(color)}`));
    });

    it.each(["lr", "rl"] as const)("sideways = %s", (sideways) => {
      render(<Button sideways={sideways} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(new RegExp(`buttonSideways${capitalize(sideways)}`));
    });

    it("icon = true", () => {
      render(<Button icon />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(/buttonIcon/);
    });
  });
});
