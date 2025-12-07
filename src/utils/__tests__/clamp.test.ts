import { describe, expect, it } from "vitest";
import { clamp } from "../clamp";

describe("clamp", () => {
  it("should return a number constrained to the inclusive range", () => {
    expect(clamp(1, 1, 1)).toBe(1);
    expect(clamp(1, 10, 1)).toBe(1);
    expect(clamp(1, 10, 5)).toBe(5);
    expect(clamp(-5, 10, 5)).toBe(5);
    expect(clamp(-5, -10, 5)).toBe(-5);
  });
});