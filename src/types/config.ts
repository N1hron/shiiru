import type { Settings } from "./settings";

export type Config = {
  settings: {
    defaults: Settings;
  };
  uploader: {
    fileLimit: number;
    accept: string;
  };
  storage: {
    theme: string;
    language: string;
    settings: string;
    rememberSettings: string;
  };
  sticker: {
    maxDuration: number;
  };
};
