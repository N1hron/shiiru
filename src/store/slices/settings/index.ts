import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Settings } from "@/types";
import { config } from "@/config";

type SettingsState = {
  items: Settings;
  remember: boolean;
};

export const defaultState: SettingsState = {
  items: config.settings.defaults,
  remember: true
};

function getInitialState(): SettingsState {
  return defaultState;
}

const settingsSlice = createSlice({
  name: "settings",
  initialState: getInitialState,
  reducers: {
    setItem<K extends keyof Settings>(state: SettingsState, action: PayloadAction<[key: K, value: Settings[K]]>) {
      const [key, value] = action.payload;
      state.items[key] = value;
    },
    resetItems(state) {
      state.items = defaultState.items;
    },
    setRemember(state, action: PayloadAction<boolean>) {
      state.remember = action.payload;
    }
  }
});

export const settingsReducer = settingsSlice.reducer;
export const settingsActions = settingsSlice.actions;
export * as settingsSelectors from "./selectors";
