import type { ParseKeys } from "i18next";

import type { FilterKeys } from "./utils";
import type { Dimensions, FileName, HorizontalAlignment, Rect, Segment, VerticalAlignment } from "./entities";

export type Theme = ThemeActual | "system";
export type ThemeActual = "light" | "dark";
export type Language = "en" | "ru";
export type TranslationKey = ParseKeys<"translation">;
export type ResizeMode = "fill" | "contain" | "cover" | "scale-down";
export type VideoQuality = "very-low" | "low" | "medium" | "high" | "very-high" | "auto";
export type AntialiasingQuality = "off" | Exclude<ResizeQuality, "pixelated">;
export type StickerType = "sticker" | "emoji";
export type StickerMode = "static" | "video";
export type ImageFormat = StickerFormat<"static">;
export type StringSettings = FilterKeys<Settings, string>;
export type BooleanSettings = FilterKeys<Settings, boolean>;
export type StringStickerSettings = FilterKeys<StickerSettings, string>;
export type BooleanStickerSettings = FilterKeys<StickerSettings, boolean>;
export type FileType = "image" | "video";

export type StickerSize<T extends StickerType = StickerType> =
  T extends "sticker" ? 512 : T extends "emoji" ? 100 : never;

export type StickerFormat<M extends StickerMode = StickerMode> =
  M extends "static" ? "png" | "webp" : M extends "video" ? "webm" : never;

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

export type UploadedFile = {
  id: string;
  signature: string;
  data: UploadedFileData;
  config: UploadedFileConfig;
};

export type UploadedFileData = {
  name: FileName;
  type: FileType;
  mime: string;
  size: number;
  dimensions: Dimensions;
  duration: number;
  url: string;
};

export type UploadedFileConfig = {
  name: FileName;
  crop: Rect;
  rotate: number;
  trim: Segment;
};
