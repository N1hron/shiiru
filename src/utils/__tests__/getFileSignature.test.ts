import { getFileSignature } from "../getFileSignature";

describe("getFileSignature", () => {
  describe("should get signature of a file", () => {
    it.each([
      [{ name: "image.png", type: "image/png", size: 500 }, "image.pngimage/png500"],
      [{ name: "video.webp", type: "video/webp", size: 1241513 }, "video.webpvideo/webp1241513"],
      [{ name: "", type: "", size: 1 }, "1"]
    ])("%o => %s", (file, signature) => {
      expect(getFileSignature(file as File)).toBe(signature);
    });
  });
});
