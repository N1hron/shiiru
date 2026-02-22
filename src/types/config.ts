import type { Settings } from "./settings";

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
    accept: string;
  };
};
