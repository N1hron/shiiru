import { selectors } from "./selectors";
import { middleware } from "./middleware";
import { effects } from "./effects";
import { actions, reducer } from "./slice";

export const ui = { ...actions, ...selectors };
export const uiMiddleware = middleware;
export const uiEffects = effects;
export const uiReducer = reducer;

