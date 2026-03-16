import { useCallback, useMemo } from "react";

import { wrap } from "../utils/wrap";

export type SpinButtonOptions<V extends string> = {
  options: SpinButtonOptionList<V>;
  value: V;
  defaultValue?: V;
  setValue: (value: V) => void;
};

export type UseSpinButtonResult = {
  min: number;
  max: number;
  now: number;
  label: string;
  next: () => void;
  prev: () => void;
  reset: () => void;
};

export type SpinButtonOptionList<V extends string> = Array<SpinButtonOption<V>>;

export type SpinButtonOption<V extends string> = {
  value: V;
  label: string;
};

export function useSpinButton<V extends string>({
  options,
  value,
  defaultValue,
  setValue
}: SpinButtonOptions<V>): UseSpinButtonResult {
  const min = 0;
  const max = options.length - 1;
  const now = options.findIndex((o) => o.value === value);
  const label = options[now].label;

  const next = useCallback(() => {
    setValue(options[wrap(0, now + 1, max)].value);
  }, [options, now, max, setValue]);

  const prev = useCallback(() => {
    setValue(options[wrap(0, now - 1, max)].value);
  }, [options, now, max, setValue]);

  const reset = useCallback(() => {
    const index = options.findIndex((o) => o.value === defaultValue);
    setValue(options[Math.max(0, index)].value);
  }, [options, defaultValue, setValue]);

  return useMemo(
    () => ({ min, max, now, label, next, prev, reset }),
    [min, max, now, label, next, prev, reset]
  );
}
