import { useEffect, useRef, type RefObject } from "react";

import { throttle } from "@/utils/throttle";

export type UseResizeObserverOptions = {
  targetRef: RefObject<Element | null>;
  callback: ResizeObserverCallback;
  box?: ResizeObserverBoxOptions;
};

export function useResizeObserver({ targetRef, callback, box }: UseResizeObserverOptions, ms?: number) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const target = targetRef.current;

    if (!target) return;

    const callback: ResizeObserverCallback = (
      ms == null ?
        (...args) => callbackRef.current(...args) :
        throttle((...args) => callbackRef.current(...args), ms)
    );

    const observer = new ResizeObserver(callback);

    observer.observe(target, { box });

    return () => {
      observer.disconnect();

      if ("cancel" in callback && typeof callback.cancel === "function") {
        (callback as ReturnType<typeof throttle>).cancel();
      }
    };
  }, [targetRef, box, ms]);
}
