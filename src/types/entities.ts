import type { ReactNode } from "react";
import type { ParseKeys } from "i18next";
import type { FilterKeys } from "./utils";

export type Theme = ThemeActual | "system";
export type ThemeActual = "light" | "dark";
export type Language = "en" | "ru";
export type Side = "left" | "right";
export type TranslationKey = ParseKeys<"translation">;
export type RenderProp<T> = (data: T) => ReactNode;
export type Fn<A extends unknown[], R, C> = (this: C, ...args: A) => R;
export type Rect = Dimensions & Coordinates;
export type VerticalAlignment = "top" | "middle" | "bottom";
export type HorizontalAlignment = "left" | "middle" | "right";
export type ResizeMode = "fill" | "contain" | "cover" | "scale-down";
export type VideoQuality = "very-low" | "low" | "medium" | "high" | "very-high" | "auto";
export type AntialiasingQuality = "off" | Exclude<ResizeQuality, "pixelated">;
export type StickerType = "sticker" | "emoji";
export type StickerMode = "static" | "video";
export type ImageFormat = StickerFormat<"static">;

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

export type Settings = StickerSettings & {
  imageFormat: ImageFormat;
  videoQuality: VideoQuality;
  downloadZip: boolean;
};

export type StickerSettings = {
  type: StickerType;
  verticalAlignment: VerticalAlignment;
  horizontalAlignment: HorizontalAlignment;
  resizeMode: ResizeMode;
  antialiasingQuality: AntialiasingQuality;
  removeSpaces: boolean;
};

export type StringSettings = FilterKeys<Settings, string>;
export type BooleanSettings = FilterKeys<Settings, boolean>;
export type StringStickerSettings = FilterKeys<StickerSettings, string>;
export type BooleanStickerSettings = FilterKeys<StickerSettings, boolean>;
