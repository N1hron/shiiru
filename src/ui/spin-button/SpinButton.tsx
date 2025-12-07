import { SpinButtonContent } from "./SpinButtonContent";
import { SpinButtonNumeric } from "./SpinButtonNumeric";
import { SpinButtonTrigger } from "./SpinButtonTrigger";
import { SpinButtonValue } from "./SpinButtonValue";
import { wrap } from "@/utils";
import type { SpinButtonProps } from "./types";

type SpinButtonStringProps<V extends string> = SpinButtonProps<{
  value: V;
  values: V[];
  defaultValue: V;
  setValue: (value: V) => void;
}>;

function SpinButton<V extends string>({
  value,
  values,
  defaultValue,
  setValue,
  ...props
}: SpinButtonStringProps<V>) {
  const valueMax = values.length - 1;
  const valueNow = values.indexOf(value);
  const increment = () => setValue(values[wrap(0, valueNow + 1, valueMax)]);
  const decrement = () => setValue(values[wrap(0, valueNow - 1, valueMax)]);
  const reset = () => setValue(values[values.indexOf(defaultValue)]);

  return (
    <SpinButtonContent
      type="string"
      valueMin={0}
      valueMax={valueMax}
      valueNow={valueNow}
      valueText={value}
      increment={increment}
      decrement={decrement}
      reset={reset}
      {...props}
    />
  );
}

SpinButton.Numeric = SpinButtonNumeric;
SpinButton.Trigger = SpinButtonTrigger;
SpinButton.Value = SpinButtonValue;

export { SpinButton };