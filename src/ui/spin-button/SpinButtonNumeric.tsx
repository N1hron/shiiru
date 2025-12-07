import { SpinButtonContent } from "./SpinButtonContent";
import { wrap } from "@/utils";
import type { SpinButtonProps } from "./types";

type SpinButtonNumericProps = SpinButtonProps<{
  min: number;
  max: number;
  value: number;
  defaultValue: number;
  setValue: (value: number) => void;
}>;

export function SpinButtonNumeric({ min, max, value, defaultValue, setValue, ...props }: SpinButtonNumericProps) {
  const increment = () => setValue(wrap(min, value + 1, max));
  const decrement = () => setValue(wrap(min, value - 1, max));
  const reset = () => setValue(defaultValue);

  return (
    <SpinButtonContent
      type="string"
      valueMin={min}
      valueMax={max}
      valueNow={value}
      increment={increment}
      decrement={decrement}
      reset={reset}
      {...props}
    />
  );
}