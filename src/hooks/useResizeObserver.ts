import { useEffect, type RefObject } from "react";

import { limit as applyLimit } from "@/utils";
import type { Limit, LimitedFn } from "@/types";

export type UseResizeObserverOptions = {
  targetRef: RefObject<Element | null>;
  callback: ResizeObserverCallback;
  box?: ResizeObserverBoxOptions;
  limit?: Limit;
};

export function useResizeObserver({ targetRef, callback, box, limit }: UseResizeObserverOptions) {
  const kind = limit?.kind;
  const ms = limit?.ms ?? 0;

  useEffect(() => {
    const target = targetRef.current;

    if (target) {
      const cb = kind ? applyLimit(callback, kind, ms) : callback;
      const observer = new ResizeObserver(cb);

      observer.observe(target, { box });

      return () => {
        observer.disconnect();

        if ("cancel" in cb && typeof cb.cancel === "function") {
          (cb as LimitedFn<unknown, unknown[]>).cancel();
        }
      };
    }
  }, [targetRef, callback, box, kind, ms]);
}
