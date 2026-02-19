import type { ParseKeys, TOptions } from "i18next";
import type { PickValues } from "./utils";

export type Theme = "light" | "dark" | "system";
export type Language = "en" | "ru";

export type TranslationKey = ParseKeys<["translation"], TOptions>;

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

export type StickerSettings = {
  type: StickerType;
  verticalAlignment: StickerVerticalAlignment;
  horizontalAlignment: StickerHorizontalAlignment;
  resize: StickerResize;
  quality: StickerQuality;
  staticFormat: StickerFormat<"static">;
  removeSpaces: boolean;
  antialiasing: boolean;
};

export type Settings = StickerSettings & {
  allowDuplicates: boolean;
};

export type StringSettings = PickValues<Settings, string>;
export type BooleanSettings = PickValues<Settings, boolean>;

export type FileName = { stem: string; ext: string };
export type FileType = "image" | "video";

export type FileElement<T extends FileType = FileType> =
  T extends "image" ? HTMLImageElement : T extends "video" ? HTMLVideoElement : never;

export type Dimensions = {
  width: number;
  height: number;
};

export type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type Range = {
  start: number;
  end: number;
};

export type InputFileData = {
  name: FileName;
  type: FileType;
  mime: string;
  size: number;
  dimensions: Dimensions;
  duration: number;
};

export type InputFileConfig = {
  name: FileName;
  crop: Rect;
  trim: Range;
};

export type InputFile = {
  id: string;
  signature: string;
  data: InputFileData;
  config: InputFileConfig;
  url: string;
};

