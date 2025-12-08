import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { StickerSettingName, StickerSettings, StickerSettingValue } from "@/types";
import type { AppState } from "@/store";

type StickerSettingsState = {
  items: StickerSettings;
};

const initialState: StickerSettingsState = {
  items: {
    size: "sticker",
    verticalAlignment: "middle",
    horizontalAlignment: "middle",
    resizeMode: "scale down",
    trim: true,
  },
};

const settingsSlice = createSlice({
  name: "stickerSettings",
  initialState,
  reducers: {
    setStickerSetting<N extends StickerSettingName>(
      state: StickerSettingsState,
      action: PayloadAction<[N, StickerSettingValue<N>]>,
    ) {
      state.items[action.payload[0]] = action.payload[1];
    },
  },
});

export const selectStickerSetting = <N extends StickerSettingName>(
  state: AppState,
  name: N,
): StickerSettingValue<N> => {
  return state.stickerSettings.items[name];
};

export const stickerSettingsReducer = settingsSlice.reducer;
export const { setStickerSetting } = settingsSlice.actions;

