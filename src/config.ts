import type {
  StickerBooleanSettingName,
  StickerStringSettingName,
  StickerStringSettingValue,
} from "./types";

type Config = {
  stickerSettings: {
    string: {
      [N in StickerStringSettingName]: {
        label: string;
        values: StickerStringSettingValue<N>[];
        defaultValue: StickerStringSettingValue<N>;
      }
    };
    boolean: {
      [N in StickerBooleanSettingName]: {
        label: string;
        defaultValue: boolean;
      }
    };
  };
  editor: {
    zoom: {
      min: number;
      max: number;
      defaultValue: number;
    };
  };
  uploader: {
    maxFiles: number;
  };
};

export const config: Config = {
  stickerSettings: {
    string: {
      size: {
        label: "Size type",
        values: ["sticker", "emoji"],
        defaultValue: "sticker",
      },
      horizontalAlignment: {
        label: "Horizontal Alignment",
        values: ["left", "middle", "right"],
        defaultValue: "middle",
      },
      verticalAlignment: {
        label: "Vertical Alignment",
        values: ["bottom", "middle", "top"],
        defaultValue: "middle",
      },
      resizeMode: {
        label: "Resize Mode",
        values: ["scale down", "contain", "cover", "fill"],
        defaultValue: "scale down",
      },
    },
    boolean: {
      trim: {
        label: "Trim spaces",
        defaultValue: true,
      },
    },
  },
  editor: {
    zoom: {
      min: 10,
      max: 3000,
      defaultValue: 100,
    },
  },
  uploader: {
    maxFiles: 20,
  },
};