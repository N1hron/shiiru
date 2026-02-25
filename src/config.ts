import type { Settings } from "./types";

export type Config = {
  storage: {
    theme: string;
    language: string;
    settings: string;
    rememberSettings: string;
  };
  settings: {
    default: Settings;
  };
  uploader: {
    maxFiles: number;
    accept: string[];
    reject: string[];
  };
};

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
    maxFiles: 20,
    accept: ["image/*", "video/*"],
    reject: ["image/svg+xml"]
  }
};
