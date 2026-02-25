import { getFileNameExt } from "../getFileNameExt";

describe("getFileNameExt", () => {
  describe("should return file name extension", () => {
    describe("should keep dot if second argument == true", () => {
      it.each([
        ["", ""],
        [".", "."],
        ["image", ""],
        ["image.", "."],
        ["image.webp", ".webp"]
      ])("'%s' => '%s'", (name, ext) => {
        expect(getFileNameExt(name, true)).toBe(ext);
      });
    });

    describe("should remove dot if second argument == false", () => {
      it.each([
        ["", ""],
        [".", ""],
        ["image", ""],
        ["image.", ""],
        ["image.webp", "webp"]
      ])("'%s' => '%s'", (name, ext) => {
        expect(getFileNameExt(name)).toBe(ext);
      });
    });
  });
});
