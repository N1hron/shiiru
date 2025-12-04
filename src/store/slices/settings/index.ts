import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getDefaultSettings } from "./utils";
import type { SettingName, Settings, SettingValue } from "@/types";
import type { AppState } from "@/store";

type SettingsState = {
  items: Settings;
  remember: boolean;
};

const defaultSettings = getDefaultSettings();

const defaultState: SettingsState = {
  items: defaultSettings,
  remember: true,
};

function getInitialState() {
  return defaultState;
}

const settingsSlice = createSlice({
  name: "settings",
  initialState: getInitialState,
  reducers: {
    setSetting<N extends SettingName>(state: SettingsState, action: PayloadAction<[N, SettingValue<N>]>) {
      state.items[action.payload[0]] = action.payload[1];
    },
    setRememberSettings(state, action: PayloadAction<boolean>) {
      state.remember = action.payload;
    },
    restoreDefaultSettings(state) {
      state.items = defaultSettings;
    },
  },
  selectors: {
    selectSettings(state) {
      return state.items;
    },
    selectRememberSettings(state) {
      return state.remember;
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
export const { setSetting, setRememberSettings, restoreDefaultSettings } = settingsSlice.actions;
export const { selectSettings, selectRememberSettings } = settingsSlice.selectors;

export const selectSetting = <N extends SettingName>(state: AppState, name: N): SettingValue<N> => {
  return state.settings.items[name];
};