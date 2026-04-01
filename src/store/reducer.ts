import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { supportReducer, supportEffects } from "./slices/support";
import { uiReducer, uiMiddleware, uiEffects } from "./slices/ui";
import { settingsReducer, settingsMiddleware } from "./slices/settings";
import { uploadReducer, uploadMiddleware } from "./slices/upload";

export const reducer = combineReducers({
  support: supportReducer,
  ui: uiReducer,
  settings: settingsReducer,
  upload: uploadReducer
});

export const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat([
    uiMiddleware.saveTheme,
    settingsMiddleware.saveSettings,
    uploadMiddleware.revokeUrls
  ]),
  devTools: import.meta.env.DEV
});

supportEffects.run();
uiEffects.run();

