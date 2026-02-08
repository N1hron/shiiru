import { clamp } from "../clamp";

describe("clamp", () => {
  describe("should limit a value to a specified range", () => {
    it.each([
      [-5, 0, 5, 0],
      [-5, 5, 5, 5],
      [-5, -5, 5, -5],
      [-5, 10, 5, 5],
      [-5, -10, 5, -5]
    ])("clamp(%d, %d, %d) = %d", (min, value, max, expected) => {
      expect(clamp(min, value, max)).toBe(expected);
    });
  });
});
