import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { StickerSettingName, StickerSettings, StickerSettingValue } from "@/types";
import type { AppState } from "@/store";

type StickerSettingsState = {
  items: StickerSettings;
  remember: boolean;
};

const defaultSettings: StickerSettings = {
  size: "sticker",
  verticalAlignment: "middle",
  horizontalAlignment: "middle",
  resizeMode: "scale down",
  trim: true,
};

const defaultState: StickerSettingsState = {
  items: defaultSettings,
  remember: true,
};

function getInitialState() {
  return defaultState;
}

const settingsSlice = createSlice({
  name: "stickerSettings",
  initialState: getInitialState,
  reducers: {
    setStickerSetting<N extends StickerSettingName>(
      state: StickerSettingsState,
      action: PayloadAction<[N, StickerSettingValue<N>]>,
    ) {
      state.items[action.payload[0]] = action.payload[1];
    },
    setRememberStickerSettings(state, action: PayloadAction<boolean>) {
      state.remember = action.payload;
    },
  },
  selectors: {
    selectRememberStickerSettings(state) {
      return state.remember;
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
export const { setStickerSetting, setRememberStickerSettings } = settingsSlice.actions;
export const { selectRememberStickerSettings } = settingsSlice.selectors;

