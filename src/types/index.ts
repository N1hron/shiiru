import type { PickValues } from "./utils";

export type Theme = "light" | "dark" | "system";
export type Language = "en" | "ru";

export type StickerType = "sticker" | "emoji";
export type StickerMode = "static" | "video";
export type StickerVerticalAlignment = "top" | "middle" | "bottom";
export type StickerHorizontalAlignment = "left" | "middle" | "right";
export type StickerResize = "fill" | "contain" | "cover" | "scale-down";
export type StickerQuality = "very-low" | "low" | "medium" | "high" | "very-high" | "auto";

export type StickerSize<T extends StickerType = StickerType> =
  T extends "sticker" ? 512 : T extends "emoji" ? 100 : never;

export type StickerFormat<M extends StickerMode = StickerMode> =
  M extends "static" ? "png" | "webp" : M extends "video" ? "webm" : never;

export type Settings = {
  type: StickerType;
  verticalAlignment: StickerVerticalAlignment;
  horizontalAlignment: StickerHorizontalAlignment;
  resize: StickerResize;
  quality: StickerQuality;
  staticFormat: StickerFormat<"static">;
  removeSpaces: boolean;
  antialiasing: boolean;
};

export type StringSettings = PickValues<Settings, string>;
export type BooleanSettings = PickValues<Settings, boolean>;
