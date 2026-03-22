import { useCallback, useState, type RefObject } from "react";

import { useResizeObserver } from "@/hooks";

export type UseDurationOptions = {
  targetRef: RefObject<Element | null>;
  mode?: "content" | "border";
  axis?: "inline" | "block";
  multiplier?: number;
};

export function useDuration({ targetRef, mode = "content", axis = "inline", multiplier = 1 }: UseDurationOptions) {
  const [duration, setDuration] = useState(0);

  const callback = useCallback((entries: ResizeObserverEntry[]) => {
    const entry = entries[0];
    const boxSize = mode === "content" ? entry.contentBoxSize[0] : entry.borderBoxSize[0];
    const size = axis === "inline" ? boxSize.inlineSize : boxSize.blockSize;
    const duration = (size / 200 * 5) * multiplier;

    setDuration(duration);
  }, [axis, mode, multiplier]);

  useResizeObserver({ targetRef, callback, box: "content-box" }, 250);

  return duration;
}
