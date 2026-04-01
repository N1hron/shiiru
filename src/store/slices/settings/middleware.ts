import type { ListenerMiddleware } from "@reduxjs/toolkit";

import { config } from "@/config";
import { actions } from "./slice";
import { selectors } from "./selectors";
import { type AppState } from "@/store";

const saveSettings: ListenerMiddleware<AppState> = (api) => (next) => (action) => {
  next(action);

  if (actions.setItems.match(action) || actions.setItem.match(action)) {
    const state = api.getState();
    const settings = selectors.selectItems(state);
    const settingsLS = JSON.stringify(settings);

    localStorage.setItem(config.storage.settings, settingsLS);
  }
};

export const middleware = {
  saveSettings
};
