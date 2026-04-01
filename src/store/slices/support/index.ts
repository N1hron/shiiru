import { actions, reducer } from "./slice";
import { selectors } from "./selectors";
import { effects } from "./effects";
import { thunks } from "./thunks";

export const support = { ...actions, ...selectors, ...thunks };
export const supportEffects = effects;
export const supportReducer = reducer;
