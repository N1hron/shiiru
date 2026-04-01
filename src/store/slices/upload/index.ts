import { reducer, actions } from "./slice";
import { selectors } from "./selectors";
import { thunks } from "./thunks";
import { middleware } from "./middleware";

export const upload = { ...actions, ...selectors, ...thunks };
export const uploadReducer = reducer;
export const uploadMiddleware = middleware;
