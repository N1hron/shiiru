import type { ReactNode } from "react";

export type RenderProp<T> = ReactNode | ((data: T) => ReactNode);
