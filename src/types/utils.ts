export type KeysMatching<O extends object, V> = {
  [K in keyof O]: O[K] extends V ? K : never;
}[keyof O];

export type PickValues<O extends object, V> = Pick<O, KeysMatching<O, V>>;

export type Values<O extends object> = O[keyof O][];
