import type { ListenerMiddleware } from "@reduxjs/toolkit";

import { settingsActions, settingsSelectors } from "../slices/settings";
import { config } from "@/config";
import type { AppState } from "@/store";

export const saveSettingsMiddleware: ListenerMiddleware<AppState> = (api) => (next) => (action) => {
  next(action);

  if (
    settingsActions.setItem.match(action) ||
    settingsActions.resetItems.match(action) ||
    settingsActions.setRemember.match(action)
  ) {
    const state = api.getState();
    const remember = settingsSelectors.selectRemember(state);

    if (remember) {
      const settings = settingsSelectors.selectItems(state);
      localStorage.setItem(config.storage.settings, JSON.stringify(settings));
    } else {
      localStorage.removeItem(config.storage.settings);
    }

    localStorage.setItem(config.storage.rememberSettings, String(remember));
  }
};
