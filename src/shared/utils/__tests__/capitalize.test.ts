import { capitalize } from "../capitalize";

describe("capitalize", () => {
  it("should capitalize first letter of a string", () => {
    expect(capitalize("h")).toBe("H");
    expect(capitalize("hello")).toBe("Hello");
  });

  it("should return empty string when input is empty", () => {
    expect(capitalize("")).toBe("");
  });

  it("should preserve case of remaining characters when second argument is false", () => {
    expect(capitalize("hElLo", false)).toBe("HElLo");
  });

  it("should lowercase remaining characters when second argument is true", () => {
    expect(capitalize("hElLo", true)).toBe("Hello");
  });
});
