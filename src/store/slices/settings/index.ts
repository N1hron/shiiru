import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { config } from "@/config";
import { parseJson } from "@/utils/parseJson";
import { correctSettings, isSettings } from "./utils";
import type { Settings } from "@/types";

type SettingsState = {
  items: Settings;
  remember: boolean;
};

export const defaultState: SettingsState = {
  items: config.settings.defaults,
  remember: true
};

function getInitialState(): SettingsState {
  const rememberLS = localStorage.getItem(config.storage.rememberSettings);
  const remember = parseJson(rememberLS, defaultState.remember);

  if (remember === true) {
    const settingsLS = localStorage.getItem(config.storage.settings);
    const settings = parseJson(settingsLS);

    if (isSettings(settings)) {
      return {
        ...defaultState,
        items: correctSettings(settings)
      };
    }
  } else if (remember === false) {
    return {
      ...defaultState,
      remember
    };
  }

  return defaultState;
}

const settingsSlice = createSlice({
  name: "settings",
  initialState: getInitialState,
  reducers: {
    setItem<N extends keyof Settings>(state: SettingsState, action: PayloadAction<[name: N, value: Settings[N]]>) {
      const [name, value] = action.payload;
      state.items[name] = value;
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
