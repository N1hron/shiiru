import type { StickerSettingName, StickerSettings } from "@/types";

export function compareStickerSettings(left: StickerSettings, right: StickerSettings) {
  for (const name of Object.keys(left) as StickerSettingName[]) {
    if (left[name] !== right[name]) {
      return false;
    }
  }
  return true;
}