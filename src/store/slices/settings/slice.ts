import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { config } from "@/config";
import { support } from "@/store";
import { parseJson } from "@/utils";
import { isSettings } from "./utils";
import type { Settings } from "@/types";

type SettingsState = {
  items: Settings;
};

function getInitialState(): SettingsState {
  const itemsLS = localStorage.getItem(config.storage.settings);
  const items = parseJson(itemsLS);

  return { items: isSettings(items) ? items : config.settings.defaults };
}

const slice = createSlice({
  name: "settings",
  initialState: getInitialState,
  reducers: {
    setItems(state, action: PayloadAction<Settings>) {
      state.items = action.payload;
    },
    setItem<S extends keyof Settings>(state: SettingsState, action: PayloadAction<[S, Settings[S]]>) {
      state.items[action.payload[0]] = action.payload[1];
    }
  },
  extraReducers(builder) {
    builder.addAsyncThunk(support.checkSupport, {
      fulfilled(state, action) {
        if (!action.payload.resizeQuality) {
          state.items.antialiasingQuality = "low";
        }
      }
    });
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
