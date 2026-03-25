import { useEffect, useRef, type RefObject } from "react";

export type UseDragOverOptions = {
  targetRef: RefObject<HTMLElement | null>;
  onStart?: (event: DragEvent) => void;
  onEnd?: (event: DragEvent) => void;
};

export function useDragOver({ targetRef, onStart, onEnd }: UseDragOverOptions) {
  const onStartRef = useRef(onStart);
  const onEndRef = useRef(onEnd);

  useEffect(() => {
    onStartRef.current = onStart;
  }, [onStart]);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    const target = targetRef.current;

    if (target) {
      const controller = new AbortController();
      const signal = controller.signal;

      let count = 0;

      target.addEventListener("dragenter", (event) => {
        if (count++ === 0) {
          onStartRef.current?.(event);
        }
      }, { signal });

      target.addEventListener("dragleave", (event) => {
        if (count-- === 1) {
          onEndRef.current?.(event);
        }
      }, { signal });

      target.addEventListener("drop", (event) => {
        count = 0;
        onEndRef.current?.(event);
      }, { signal });

      return () => {
        controller.abort();
      };
    }
  }, [targetRef]);
}
