export type KeysMatching<T extends object, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type FilterValues<T extends object, V> = {
  [K in KeysMatching<T, V>]: T[K]
};

export type StickerSize = "sticker" | "emoji";
export type StickerVerticalAlignment = "top" | "middle" | "bottom";
export type StickerHorizontalAlignment = "left" | "middle" | "right";
export type StickerResizeMode = "fill" | "contain" | "cover" | "scale down";

export type StickerSettings = {
  size: StickerSize;
  verticalAlignment: StickerVerticalAlignment;
  horizontalAlignment: StickerHorizontalAlignment;
  resizeMode: StickerResizeMode;
  trim: boolean;
};

export type StickerStringSetttings = FilterValues<StickerSettings, string>;
export type StickerBooleanSetttings = FilterValues<StickerSettings, boolean>;

export type StickerSettingName = keyof StickerSettings;
export type StickerStringSettingName = keyof StickerStringSetttings;
export type StickerBooleanSettingName = keyof StickerBooleanSetttings;

export type StickerSettingValue<V extends StickerSettingName> = StickerSettings[V];
export type StickerStringSettingValue<V extends StickerStringSettingName> = StickerSettings[V];

export type UploadedFile = {
  id: string;
  name: string;
  mime: string;
  size: number;
  type: "image" | "video";
  url: string;
  width: number;
  height: number;
  duration: number;
};