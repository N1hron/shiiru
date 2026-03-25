import type { Settings, StringSettings } from "@/types";

export type Config = {
  storage: {
    theme: string;
    language: string;
    settings: string;
  };
  settings: {
    defaults: Settings;
    values: { [K in keyof StringSettings]: StringSettings[K][]; };
  };
  upload: {
    maxFiles: number;
    accept: string[];
    reject: string[];
  };
};
