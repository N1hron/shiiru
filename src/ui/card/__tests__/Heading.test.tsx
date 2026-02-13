import { render, screen } from "@testing-library/react";

import { Heading, type HeadingElement } from "../Heading";

describe("Heading", () => {
  it("should render correctly", () => {
    render(<Heading className="test-class" as="h1">Heading</Heading>);

    const heading = screen.getByRole("heading", { name: "Heading" });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("test-class");
  });

  describe("should render with correct html tag", () => {
    it.each([1, 2, 3, 4, 5, 6])("h%s", (level) => {
      const as = ("h" + level) as HeadingElement;
      render(<Heading as={as} />);

      const heading = screen.getByRole("heading", { level });
      expect(heading).toBeInTheDocument();
    });
  });
});
