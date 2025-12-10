export function throttle<P extends unknown[], C>(fn: (this: C, ...args: P) => unknown, ms: number) {
  let timeoutId: number | null = null;
  let saved: { this: C; args: P } | null = null;

  return function throttled(this: C, ...args: P) {
    if (timeoutId) {
      saved = { this: this, args };
    } else {
      saved = null;

      fn.apply(this, args);

      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (saved) {
          throttled.apply(saved.this, saved.args);
        };
      }, ms);
    }
  };
}