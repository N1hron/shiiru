export type KeysMatching<T extends object, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type FilterValues<T extends object, V> = {
  [K in KeysMatching<T, V>]: T[K]
};