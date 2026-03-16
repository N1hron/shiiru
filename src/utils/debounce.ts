import type { Fn } from "@/types";

export function debounce<A extends unknown[], R, C>(fn: Fn<A, R, C>, ms: number) {
  let timeoutId: number;

  return function debounced(this: C, ...args: A) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}
