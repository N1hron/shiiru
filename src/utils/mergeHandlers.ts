import type { SyntheticEvent } from "react";

export function mergeHandlers<E extends Event | SyntheticEvent>(...handlers: (((e: E) => void) | undefined)[]) {
  return function(this: unknown, event: E) {
    for (const handler of handlers) {
      handler?.call(this, event);
    }
  };
}
