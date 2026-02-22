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
