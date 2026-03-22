import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { support, supportReducer } from "./slices/support";
import { uiReducer, listenToIsMobile, listenToPreferredTheme, saveThemeMiddleware } from "./slices/ui";

export const reducer = combineReducers({
  support: supportReducer,
  ui: uiReducer
});

export const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat([saveThemeMiddleware]),
  devTools: import.meta.env.DEV
});

void store.dispatch(support.checkSupport());

listenToIsMobile();
listenToPreferredTheme();

