import type { Language, Settings, StringSettings, Theme } from "@/types";

export type Translation = {
  theme: Record<"toggle" | "current" | Theme, string>;
  language: Record<"toggle" | "current" | Language, string>;
  spinSelect: Record<"prev" | "next" | "reset", string>;
  stickerSettings: Record<"heading" | "reset" | "toggle", string>;
  settings: {
    labels: Record<keyof Settings, string>;
    values: { [K in keyof StringSettings]: Record<StringSettings[K], string> };
  };
};
