import { describe, expect, it } from "vitest";
import { splitFileName } from "../splitFileName";

describe("splitFileName", () => {
  it("should return a tuple containing the base file name and its extension", () => {
    expect(splitFileName("image.png")).toEqual(["image", "png"]);
    expect(splitFileName("image.png.webp")).toEqual(["image.png", "webp"]);
    expect(splitFileName("image")).toEqual(["image", ""]);
    expect(splitFileName("")).toEqual(["", ""]);
  });
});