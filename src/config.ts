import type { Config } from "./types";

export const config: Config = {
  storage: {
    theme: "theme",
    language: "language",
    settings: "settings",
    rememberSettings: "rememberSettings"
  },
  settings: {
    default: {
      type: "sticker",
      verticalAlignment: "middle",
      horizontalAlignment: "middle",
      resize: "contain",
      quality: "auto",
      staticFormat: "webp",
      removeSpaces: true,
      antialiasing: false,
      allowDuplicates: false
    }
  },
  uploader: {
    maxFiles: 25,
    accept: "image/*, video/*"
  }
};
