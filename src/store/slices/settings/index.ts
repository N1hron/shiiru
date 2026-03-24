import * as selectors from "./selectors";
import * as thunks from "./thunks";

import { actions, reducer } from "./slice";

export const settingsReducer = reducer;
export const settings = { ...actions, ...selectors, ...thunks };

export * from "./middleware";
