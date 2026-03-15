import { useCallback, useMemo } from "react";

import { wrap } from "../utils/wrap";

export type UseSpinButtonOptions<V extends string> = {
  options: UseSpinButtonOptionList<V>;
  value: V;
  defaultValue?: V;
  setValue: (value: V) => void;
};

export type UseSpinButtonOptionList<V extends string> = Array<UseSpinButtonOption<V>>;

export type UseSpinButtonOption<V extends string> = {
  value: V;
  label: string;
};

export function useSpinButton<V extends string>({ options, value, defaultValue, setValue }: UseSpinButtonOptions<V>) {
  const min = 0;
  const max = options.length - 1;
  const now = options.findIndex((o) => o.value === value);
  const label = options[now].label;

  const setNext = useCallback(() => {
    setValue(options[wrap(0, now + 1, max)].value);
  }, [options, now, max, setValue]);

  const setPrev = useCallback(() => {
    setValue(options[wrap(0, now - 1, max)].value);
  }, [options, now, max, setValue]);

  const reset = useCallback(() => {
    const index = options.findIndex((o) => o.value === defaultValue);
    setValue(options[Math.max(0, index)].value);
  }, [options, defaultValue, setValue]);

  return useMemo(
    () => ({ min, max, now, label, setNext, setPrev, reset }),
    [min, max, now, label, setNext, setPrev, reset]
  );
}
