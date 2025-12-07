import type { ComponentPropsWithRef } from "react";

type SpinButtonBaseProps = ComponentPropsWithRef<"div"> & {
  disabled?: boolean;
} & ({
  label: string;
  labelledBy?: never;
} | {
  label?: never;
  labelledBy: string;
});

export type SpinButtonProps<P> = SpinButtonBaseProps & P;