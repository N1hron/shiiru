import { useEffect, type RefObject } from "react";

import { throttle } from "@/utils/throttle";

export type UseResizeObserverOptions = {
  targetRef: RefObject<Element | null>;
  callback: ResizeObserverCallback;
  box?: ResizeObserverBoxOptions;
};

export function useResizeObserver({ targetRef, callback, box }: UseResizeObserverOptions, ms?: number) {
  useEffect(() => {
    const target = targetRef.current;

    if (target) {
      const observer = new ResizeObserver(ms == null ? callback : throttle(callback, ms));

      observer.observe(target, { box });

      return () => {
        observer.disconnect();

        if ("cancel" in callback && typeof callback.cancel === "function") {
          (callback as ReturnType<typeof throttle>).cancel();
        }
      };
    }
  }, [targetRef, callback, box, ms]);
}
