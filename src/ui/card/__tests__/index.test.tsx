import { render, screen } from "@testing-library/react";

import { Card } from "..";

describe("Card", () => {
  it("should render correctly", () => {
    render(<Card className="test-class" data-testid>Test content</Card>);

    const card = screen.getByText("Test content");

    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("test-class");
    expect(card).toHaveRole("generic");
  });

  it("should render with provided html tag", () => {
    render(<Card as="section" aria-label="Accessible name" />);
    render(<Card as="aside" />);
    render(<Card as="article" />);

    const cardSection = screen.getByRole("region");
    const cardAside = screen.getByRole("complementary");
    const cardArticle = screen.getByRole("article");

    expect(cardSection).toBeInTheDocument();
    expect(cardSection.tagName).toBe("SECTION");

    expect(cardAside).toBeInTheDocument();
    expect(cardAside.tagName).toBe("ASIDE");

    expect(cardArticle).toBeInTheDocument();
    expect(cardArticle.tagName).toBe("ARTICLE");
  });
});
