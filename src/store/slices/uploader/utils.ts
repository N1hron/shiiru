import { VIDEO_STICKER_MAX_DURATION } from "@/constants";
import type { InputFileConfig, InputFileData } from "@/types";

export function getFileConfig(data: InputFileData): InputFileConfig {
  return {
    name: data.name,
    crop: {
      top: 0,
      height: data.dimensions.height,
      left: 0,
      width: data.dimensions.width
    },
    trim: {
      start: 0,
      end: Math.min(data.duration, VIDEO_STICKER_MAX_DURATION)
    }
  };
}
