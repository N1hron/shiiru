import type { Middleware } from "@reduxjs/toolkit";

import { removeUploaderItem, type AppState } from "..";

export const revokeUrlsMiddleware: Middleware<unknown, AppState> = (api) => (next) => (action) => {
  if (removeUploaderItem.match(action)) {
    const item = api.getState().uploader.items.find((item) => item.id === action.payload);

    if (item) {
      URL.revokeObjectURL(item.url);
    };
  }

  return next(action);
};