import type { Config } from "./types";

export const config: Config = {
  storage: {
    theme: "theme",
    language: "language",
    settings: "settings"
  },
  uploader: {
    maxFiles: 20,
    accept: ["image/*", "video/*"],
    reject: ["image/svg+xml"]
  },
  settings: {
    defaults: {
      type: "sticker",
      verticalAlignment: "middle",
      horizontalAlignment: "middle",
      resizeMode: "scale-down",
      antialiasingQuality: "high",
      removeSpaces: true,
      imageFormat: "webp",
      videoQuality: "auto",
      downloadZip: true
    },
    values: {
      type: ["sticker", "emoji"],
      verticalAlignment: ["top", "middle", "bottom"],
      horizontalAlignment: ["left", "middle", "right"],
      resizeMode: ["scale-down", "contain", "cover", "fill"],
      antialiasingQuality: ["off", "low", "medium", "high"],
      imageFormat: ["webp", "png"],
      videoQuality: ["auto", "very-low", "low", "medium", "high", "very-high"]
    }
  }
};
