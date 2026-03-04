import { parseFileName } from "../parseFileName";

describe("parseFileName", () => {
  describe("should parse file name string into object", () => {
    it.each([
      ["", { full: "", stem: "", ext: "" }],
      ["image", { full: "image", stem: "image", ext: "" }],
      ["image.", { full: "image.", stem: "image", ext: "" }],
      ["image.png", { full: "image.png", stem: "image", ext: "png" }],
      ["image.png.jpeg", { full: "image.png.jpeg", stem: "image.png", ext: "jpeg" }]
    ])("'%s' => %o", (name, expected) => {
      expect(parseFileName(name)).toEqual(expected);
    });
  });
});
