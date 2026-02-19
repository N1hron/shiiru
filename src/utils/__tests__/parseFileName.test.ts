import { parseFileName } from "../parseFileName";

describe("parseFileName", () => {
  describe("should parse file name string into object", () => {
    it.each([
      ["", { stem: "", ext: "" }],
      ["image", { stem: "image", ext: "" }],
      ["image.", { stem: "image", ext: "" }],
      ["image.png", { stem: "image", ext: "png" }],
      ["image.png.jpeg", { stem: "image.png", ext: "jpeg" }]
    ])("'%s' => %o", (name, expected) => {
      expect(parseFileName(name)).toEqual(expected);
    });
  });
});
