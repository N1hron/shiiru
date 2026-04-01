import { useCallback, type RefObject } from "react";

import { useResizeObserver } from "@/hooks";

export function useBackgroundAnimation(targetRef: RefObject<HTMLElement | null>, multiplier = 1) {
  const callback = useCallback((entries: ResizeObserverEntry[]) => {
    const target = targetRef.current;

    if (target) {
      const entry = entries[0];
      const size = entry.contentBoxSize[0].inlineSize;
      const duration = (size / 200 * 5) * multiplier;

      target.style.setProperty("--background-animation-duration", duration + "s");
    }
  }, [targetRef, multiplier]);

  useResizeObserver({
    targetRef,
    callback,
    box: "content-box",
    limit: { kind: "throttle", ms: 250 }
  });
}
