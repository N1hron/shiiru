import type { Fn, LimitedFn } from "@/types";

export function throttle<C, A extends unknown[]>(fn: Fn<C, A, void>, ms: number): LimitedFn<C, A> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let saved: { context: C; args: A } | null = null;

  function throttled(this: C, ...args: A) {
    if (timeoutId) {
      saved = { context: this, args };
    } else {
      fn.apply(this, args);

      timeoutId = setTimeout(() => {
        timeoutId = null;

        if (saved) {
          const { context, args } = saved;
          saved = null;

          throttled.apply(context, args);
        }
      }, ms);
    }
  }

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);

      timeoutId = null;
      saved = null;
    }
  };

  return throttled;
}
