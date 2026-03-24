import type { ListenerMiddleware } from "@reduxjs/toolkit";

import { config } from "@/config";
import { actions } from "./slice";
import { type AppState } from "@/store";

export const saveSettingsMiddleware: ListenerMiddleware<AppState> = (storeApi) => (next) => (action) => {
  next(action);

  if (actions.setItems.match(action) || actions.setItem.match(action)) {
    const settings = JSON.stringify(storeApi.getState().settings.items);
    localStorage.setItem(config.storage.settings, settings);
  }
};
