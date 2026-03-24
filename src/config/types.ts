import type { Settings, StringSettings } from "@/types";

export type Config = {
  storage: {
    theme: string;
    language: string;
    settings: string;
  };
  uploader: {
    maxFiles: number;
    accept: string[];
    reject: string[];
  };
  settings: {
    defaults: Settings;
    values: { [K in keyof StringSettings]: StringSettings[K][]; };
  };
};
