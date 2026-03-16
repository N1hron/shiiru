import { wrap } from "../wrap";

describe("wrap", () => {
  describe("should wrap value to specified range", () => {
    it.each([
      [0, 5, 10, 5],
      [0, 0, 10, 0],
      [0, 10, 10, 10],
      [0, 15, 10, 4],
      [0, -5, 10, 6]
    ])("wrap(%d, %d, %d) = %d", (min, value, max, expected) => {
      expect(wrap(min, value, max)).toBe(expected);
    });
  });
});
