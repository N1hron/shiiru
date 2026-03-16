import type { ReactNode } from "react";

export type RenderProp<T> = ReactNode | ((data: T) => ReactNode);
export type Fn<A extends unknown[], R, C> = (this: C, ...args: A) => R;

export * from "./utils";
