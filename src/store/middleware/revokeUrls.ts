import type { ListenerMiddleware } from "@reduxjs/toolkit";

import { uploaderActions, uploaderSelectors } from "../slices/uploader";
import type { AppState } from "..";

export const revokeUrlsMiddleware: ListenerMiddleware<AppState> = (api) => (next) => (action) => {
  if (uploaderActions.removeFile.match(action)) {
    const file = uploaderSelectors.selectFile(api.getState(), action.payload);

    if (file) {
      URL.revokeObjectURL(file.url);
    }
  }

  next(action);
};
