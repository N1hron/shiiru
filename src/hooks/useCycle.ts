import { useCallback, useMemo } from "react";

import { wrap } from "@/utils";

export type UseCycleOptions<V extends string> = {
  value: V;
  values: V[];
  defaultValue?: V;
  setValue: (value: V) => void;
};

export function useCycle<V extends string>({
  value,
  values,
  defaultValue = values[0],
  setValue
}: UseCycleOptions<V>) {
  const index = values.indexOf(value);

  const next = useCallback(() => {
    setValue(values[wrap(0, index + 1, values.length - 1)]);
  }, [setValue, values, index]);

  const prev = useCallback(() => {
    setValue(values[wrap(0, index - 1, values.length - 1)]);
  }, [setValue, values, index]);

  const reset = useCallback(() => {
    setValue(values[values.indexOf(defaultValue)]);
  }, [setValue, values, defaultValue]);

  return useMemo(
    () => ({ value, index, next, prev, reset }),
    [value, index, next, prev, reset]
  );
}
