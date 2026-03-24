/* eslint-disable react-hooks/refs */

import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T) {
  const valueRef = useRef<T>(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef.current;
}
