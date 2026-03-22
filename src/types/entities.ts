import type { ReactNode } from "react";
import type { ParseKeys } from "i18next";

export type Theme = ThemeActual | "system";
export type ThemeActual = "light" | "dark";
export type Language = "en" | "ru";
export type TranslationKey = ParseKeys<"translation">;
export type RenderProp<T> = (data: T) => ReactNode;
export type Fn<A extends unknown[], R, C> = (this: C, ...args: A) => R;
export type Rect = Dimensions & Coordinates;
export type VerticalAlignment = "top" | "middle" | "bottom";
export type HorizontalAlignment = "left" | "middle" | "right";
export type Resize = "fill" | "contain" | "cover" | "scale-down";
export type VideoQuality = "very-low" | "low" | "medium" | "high" | "very-high" | "auto";
export type AntialiasingQuality = "off" | Exclude<ResizeQuality, "pixelated">;
export type StickerType = "sticker" | "emoji";
export type StickerMode = "static" | "video";

export type StickerSize<T extends StickerType = StickerType> =
  T extends "sticker" ? 512 : T extends "emoji" ? 100 : never;

export type StickerFormat<M extends StickerMode = StickerMode> =
  M extends "static" ? "png" | "webp" : M extends "video" ? "webm" : never;

export type Dimensions = {
  width: number;
  height: number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type Segment = {
  start: number;
  end: number;
};

export type Settings = {
  sticker: StickerSettings;
  videoQuality: VideoQuality;
  staticFormat: StickerFormat<"static">;
  saveAsZip: boolean;
};

export type StickerSettings = {
  type: StickerType;
  verticalAlignment: VerticalAlignment;
  horizontalAlignment: HorizontalAlignment;
  resize: Resize;
  antialiasingQuality: AntialiasingQuality;
  removeSpaces: boolean;
};
