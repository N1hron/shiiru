import { actions, reducer } from "./slice";
import { selectors } from "./selectors";
import { thunks } from "./thunks";
import { middleware } from "./middleware";

export const settings = { ...actions, ...selectors, ...thunks };
export const settingsMiddleware = middleware;
export const settingsReducer = reducer;
