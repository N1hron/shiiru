import type { Fn, LimitedFn } from "@/types";

export function debounce<C, A extends unknown[]>(fn: Fn<C, A, void>, ms: number): LimitedFn<C, A> {
  let timeoutId: number;

  function debounced(this: C, ...args: A) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  }

  debounced.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debounced;
}
