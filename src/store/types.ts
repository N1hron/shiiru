import type { Middleware } from "@reduxjs/toolkit";

import type { reducer, store } from ".";

export type AppState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export type AppMiddleware = Middleware<unknown, AppState>;
