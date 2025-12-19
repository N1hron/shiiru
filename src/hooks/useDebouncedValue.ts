import { useEffect, useRef, useState } from "react";

export function useDebouncedValue<T>(value: T, ms: number) {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      timeoutIdRef.current = null;
      setDebouncedValue(value);
    }, ms);
  }, [value, ms]);

  return debouncedValue;
}