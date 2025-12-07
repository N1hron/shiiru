import { describe, expect, it } from "vitest";

import { wrap } from "../wrap";

describe("wrap", () => {
  it("should return a cyclically wrapped number within the inclusive range", () => {
    expect(wrap(1, 1, 1)).toBe(1);
    expect(wrap(1, 10, 1)).toBe(1);
    expect(wrap(1, 10, 5)).toBe(5);
    expect(wrap(-5, 10, 5)).toBe(-1);
    expect(wrap(-5, -10, 5)).toBe(1);
  });
});

