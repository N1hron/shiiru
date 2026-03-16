import { useEffect, useRef, type RefObject } from "react";

import { throttle } from "@/utils/throttle";

export type UseResizeObserverOptions = {
  targetRef: RefObject<Element | null>;
  callback: ResizeObserverCallback;
  box?: ResizeObserverBoxOptions;
};

export function useResizeObserver({ targetRef, callback, box }: UseResizeObserverOptions, throttleMs?: number) {
  const observerRef = useRef<ResizeObserver>(null);

  useEffect(() => {
    const observer = new ResizeObserver(
      throttleMs != null ?
        throttle(callback, throttleMs) : callback
    );

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [callback, throttleMs]);

  useEffect(() => {
    const observer = observerRef.current;
    const target = targetRef.current;

    if (observer && target) {
      observer.observe(target, { box });

      return () => {
        observer.unobserve(target);
      };
    }
  }, [callback, throttleMs, targetRef, box]);
}
