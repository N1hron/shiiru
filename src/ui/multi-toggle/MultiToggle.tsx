import { Button, type ButtonProps } from "@/ui";
import { useCycle, type UseCycleOptions } from "@/hooks";
import { mergeHandlers } from "@/utils";

export type MultiToggleProps<V extends string> = Omit<ButtonProps, "value" | "defaultValue"> & UseCycleOptions<V>;

export function MultiToggle<V extends string>({ value, values, setValue, onClick, ...props }: MultiToggleProps<V>) {
  const { next } = useCycle({ value, values, setValue });

  return <Button onClick={mergeHandlers(next, onClick)} {...props} />;
}
