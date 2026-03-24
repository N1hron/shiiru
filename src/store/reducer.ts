import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { supportReducer, support } from "./slices/support";
import { listenToIsMobile, listenToPreferredTheme, saveThemeMiddleware, uiReducer } from "./slices/ui";
import { saveSettingsMiddleware, settingsReducer } from "./slices/settings";

export const reducer = combineReducers({
  support: supportReducer,
  ui: uiReducer,
  settings: settingsReducer
});

export const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat([saveThemeMiddleware, saveSettingsMiddleware]),
  devTools: import.meta.env.DEV
});

void store.dispatch(support.checkSupport());

listenToIsMobile();
listenToPreferredTheme();

