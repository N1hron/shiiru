// Reason: 'this' must be preserved in order to correctly call 'fn'
/* eslint-disable @typescript-eslint/no-this-alias */

import type { Fn } from "@/types";

export function throttle<A extends unknown[], R, C>(fn: Fn<A, R, C>, ms: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastThis: C | null = null;
  let lastArgs: A | null = null;

  return function throttledFn(this: C, ...args: A) {
    if (timeoutId) {
      lastThis = this;
      lastArgs = args;
    } else {
      fn.apply(this, args);

      timeoutId = setTimeout(() => {
        timeoutId = null;

        if (lastThis !== null && lastArgs !== null) {
          throttledFn.apply(lastThis, lastArgs);

          lastThis = null;
          lastArgs = null;
        }
      }, ms);
    }
  };
}
