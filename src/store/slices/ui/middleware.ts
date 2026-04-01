import { config } from "@/config";
import { actions } from "./slice";
import { type AppMiddleware } from "@/store";

export const saveTheme: AppMiddleware = () => (next) => (action) => {
  if (actions.setTheme.match(action)) {
    localStorage.setItem(config.storage.theme, action.payload);
  }
  next(action);
};

export const middleware = {
  saveTheme
};
