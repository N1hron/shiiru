import { reducer, actions } from "./slice";
import * as selectors from "./selectors";
import * as thunks from "./thunks";

export const uploadReducer = reducer;
export const upload = { ...actions, ...selectors, ...thunks };
