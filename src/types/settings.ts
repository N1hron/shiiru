import type {
  StickerFormat,
  StickerHorizontalAlignment,
  StickerQuality,
  StickerResize,
  StickerType,
  StickerVerticalAlignment
} from "./stickers";

import type { PickValues } from "./utils";

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
