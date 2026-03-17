import type { ReactNode } from "react";

export type RenderProp<T> = ReactNode | ((data: T) => ReactNode);
export type Fn<A extends unknown[], R, C> = (this: C, ...args: A) => R;

export type Rect = Dimensions & Coordinates;

export type Dimensions = {
  width: number;
  height: number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type Segment = {
  start: number;
  end: number;
};

