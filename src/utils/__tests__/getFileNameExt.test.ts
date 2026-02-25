import { getFileNameExt } from "../getFileNameExt";

describe("getFileNameExt", () => {
  describe("should return file name extension", () => {
    it.each([
      ["", ""],
      ["image", ""],
      ["image.", ""],
      ["image.webp", "webp"]
    ])("'%s' => '%s'", (name, ext) => {
      expect(getFileNameExt(name)).toBe(ext);
    });
  });
});
