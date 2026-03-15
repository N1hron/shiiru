import type { ReactNode } from "react";

export type RenderProp<T> = ReactNode | ((data: T) => ReactNode);

export type Shift<A extends Array<unknown>> = A extends [unknown, ...infer R] ? R : never;

export type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;
