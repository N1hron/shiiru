import type { BooleanSettings, StringSettings } from "@/types";

export type SettingsItemsTranslation = {
  [K in keyof StringSettings]: {
    label: string;
    options: Record<StringSettings[K], string>;
  }
} & {
  [K in keyof BooleanSettings]: {
    label: string;
  }
};
