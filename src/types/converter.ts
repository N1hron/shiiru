type StickerSize = "sticker" | "emoji";
type VerticalAlignment = "top" | "middle" | "bottom";
type HorizontalAlignment = "left" | "middle" | "right";
type ResizeMode = "fill" | "contain" | "cover" | "scale down";

export type ConverterSettings = {
  size: StickerSize;
  verticalAlignment: VerticalAlignment;
  horizontalAlignment: HorizontalAlignment;
  resizeMode: ResizeMode;
  trim: boolean;
};

// export type StickerStringSetttings = FilterValues<StickerSettings, string>;
// export type StickerBooleanSetttings = FilterValues<StickerSettings, boolean>;

// export type StickerSettingName = keyof StickerSettings;
// export type StickerStringSettingName = keyof StickerStringSetttings;
// export type StickerBooleanSettingName = keyof StickerBooleanSetttings;

// export type StickerSettingValue<V extends StickerSettingName> = StickerSettings[V];
// export type StickerStringSettingValue<V extends StickerStringSettingName> = StickerSettings[V];