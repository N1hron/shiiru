import type { ActivityProps, ReactNode } from "react";

export type Fn<C, A extends unknown[], R> = (this: C, ...args: A) => R;
export type Side = "left" | "right";
export type Rect = Position & Dimensions;
export type VerticalAlignment = "top" | "middle" | "bottom";
export type HorizontalAlignment = "left" | "middle" | "right";
export type FileName = { full: string; stem: string; ext: string };
export type Validity = "valid" | "partial" | "invalid";
export type ActivityMode = NonNullable<ActivityProps["mode"]>;
export type FrameProps = { children: ReactNode };
export type LimitKind = "debounce" | "throttle";

export type LimitedFn<C, A extends unknown[]> = {
  (this: C, ...args: A): void;
  cancel: () => void;
};

export type Limit = {
  kind: LimitKind;
  ms: number;
};

export type Position = {
  x: number;
  y: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type Segment = {
  start: number;
  end: number;
};
