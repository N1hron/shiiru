import { describe, expect, it } from "vitest";

import { satisfiesAccept } from "@/utils/satisfiesAccept";

describe("satisfiesAccept", () => {
  it("should return true if file satisfies accept", () => {
    const testCases = [
      [{ name: "", type: "" }, ""],
      [{ name: "image.png", type: "image/png" }, "image/*"],
      [{ name: "", type: "image/png" }, "image/png"],
      [{ name: "image.png", type: "" }, ".png"],
      [{ name: "", type: "text/html; charset=utf-8" }, "text/html"],
    ] as const;

    for (const [file, accept] of testCases) {
      expect(satisfiesAccept(file, accept)).toBe(true);
    }
  });

  it("should return false if file does not satisfy accept", () => {
    const testCases = [
      [{ name: "video.mp4", type: "video/mp4" }, "image/*"],
      [{ name: "video.mp4", type: "video/mp4" }, "video/webm"],
      [{ name: "video.mp4", type: "" }, "video/mp4"],
      [{ name: "", type: "video/mp4" }, ".mp4"],
    ] as const;

    for (const [file, accept] of testCases) {
      expect(satisfiesAccept(file, accept)).toBe(false);
    }
  });
});