export type KeysMatch<O extends object, V> = {
  [K in keyof O]: O[K] extends V ? K : never;
}[keyof O];

export type PickValues<O extends object, V> = Pick<O, KeysMatch<O, V>>;

export type Values<O extends object> = O[keyof O][];

export type IterableArrayLike<V> = Iterable<V> & ArrayLike<V>;

export type Canvas = HTMLCanvasElement | OffscreenCanvas;

export type CanvasContext2D<C extends Canvas = Canvas> =
  C extends HTMLCanvasElement ? CanvasRenderingContext2D :
  C extends OffscreenCanvas ? OffscreenCanvasRenderingContext2D : never;
