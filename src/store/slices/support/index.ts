import * as selectors from "./selectors";
import * as thunks from "./thunks";
import { actions, reducer } from "./slice";

export const supportReducer = reducer;
export const support = { ...actions, ...selectors, ...thunks };
