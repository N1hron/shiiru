import type { Language, Theme } from "@/types";

export type Translation = {
  theme: Record<"toggle" | "current" | Theme, string>;
  language: Record<"toggle" | "current" | Language, string>;
  spinSelect: Record<"prev" | "next" | "reset", string>;
  stickerSettings: Record<"reset" | "toggle", string>;
};
