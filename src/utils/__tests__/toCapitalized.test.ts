import { describe, it, expect } from "vitest";
import { toCapitalized } from "../toCapitalized";

describe("toCapitalized", () => {
  it("should capitalize string", () => {
    expect(toCapitalized("")).toBe("");
    expect(toCapitalized("a")).toBe("A");
    expect(toCapitalized("apple")).toBe("Apple");
  });
});