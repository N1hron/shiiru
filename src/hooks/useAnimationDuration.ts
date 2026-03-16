import { useCallback, useState, type RefObject } from "react";
import { useResizeObserver } from "./useResizeObserver";

export type UseAnimationDurationOptions = {
  targetRef: RefObject<Element | null>;
  mode?: UseAnimationDurationMode;
  axis?: UseAnimationDurationAxis;
  multiplier?: number;
};

export type UseAnimationDurationMode = "content" | "border";
export type UseAnimationDurationAxis = "inline" | "block";

export function useAnimationDuration({
  targetRef,
  mode = "content",
  axis = "inline",
  multiplier = 1
}: UseAnimationDurationOptions) {
  const [duration, setDuration] = useState(0);

  const callback = useCallback((entries: Array<ResizeObserverEntry>) => {
    const entry = entries[0];
    const boxSize = mode === "content" ? entry.contentBoxSize[0] : entry.borderBoxSize[0];
    const size = axis === "inline" ? boxSize.inlineSize : boxSize.blockSize;
    const duration = (size / 200 * 5) * multiplier;

    setDuration(duration);
  }, [axis, mode, multiplier]);

  useResizeObserver({
    targetRef,
    box: "content-box",
    callback
  }, 250);

  return duration;
}
