import type { Config } from "./types";

export const config: Config = {
  storage: {
    theme: "theme",
    language: "language"
  },
  uploader: {
    maxFiles: 20,
    accept: ["image/*", "video/*"],
    reject: ["image/svg+xml"]
  }
};
