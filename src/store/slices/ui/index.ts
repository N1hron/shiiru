import * as selectors from "./selectors";
import { actions, reducer } from "./slice";

export const uiReducer = reducer;
export const ui = { ...actions, ...selectors };

export * from "./listeners";
export * from "./middleware";
