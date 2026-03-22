export type Shift<A extends unknown[]> = A extends [unknown, ...infer R] ? R : never;
export type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

export type ExtractKeys<O extends object, V> = {
  [K in keyof O]: O[K] extends V ? K : never;
}[keyof O];

export type FilterKeys<O extends object, V> = Pick<O, ExtractKeys<O, V>>;
