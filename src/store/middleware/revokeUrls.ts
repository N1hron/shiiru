import type { Middleware } from "@reduxjs/toolkit";
import { removeFile, type AppState } from "..";

export const revokeUrlsMiddleware: Middleware<unknown, AppState> = (api) => (next) => (action) => {
  if (removeFile.match(action)) {
    const item = api.getState().uploader.items.find((item) => item.id === action.payload);

    if (item) {
      console.log("revoke", item.url);
      URL.revokeObjectURL(item.url);
    };
  }

  return next(action);
};