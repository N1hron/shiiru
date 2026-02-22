import type { Config } from "./types";

export const config: Config = {
  settings: {
    defaults: {
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
    fileLimit: 25,
    accept: "image/*, video/*"
  },
  storage: {
    theme: "theme",
    language: "language",
    settings: "settings",
    rememberSettings: "rememberSettings"
  },
  sticker: {
    maxDuration: 3
  }
};
