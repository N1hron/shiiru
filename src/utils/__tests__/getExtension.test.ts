import { getExtension } from "@/utils";

describe("getExtension", () => {
  describe("should return file name extension", () => {
    describe("should keep dot if second argument equals true", () => {
      it.each([
        ["", ""],
        [".", "."],
        ["image", ""],
        ["image.", "."],
        ["image.webp", ".webp"]
      ])("'%s' => '%s'", (name, ext) => {
        expect(getExtension(name, true)).toBe(ext);
      });
    });

    describe("should remove dot if second argument equals false", () => {
      it.each([
        ["", ""],
        [".", ""],
        ["image", ""],
        ["image.", ""],
        ["image.webp", "webp"]
      ])("'%s' => '%s'", (name, ext) => {
        expect(getExtension(name)).toBe(ext);
      });
    });
  });
});
