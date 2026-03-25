export type Fn<A extends unknown[], R, C> = (this: C, ...args: A) => R;
export type Side = "left" | "right";
export type Rect = Position & Dimensions;
export type VerticalAlignment = "top" | "middle" | "bottom";
export type HorizontalAlignment = "left" | "middle" | "right";
export type FileName = { full: string; stem: string; ext: string };

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
