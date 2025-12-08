import clsx from "clsx";
import { useId, type ComponentPropsWithRef } from "react";

import { SpinButtonContext, type SpinButtonContextValue } from "./SpinButtonContext";

import styles from "./style.module.scss";

type SpinButtonContentProps = ComponentPropsWithRef<"div"> & Omit<SpinButtonContextValue, "id"> & {
  cyclic?: boolean;
  disabled?: boolean;
};

export function SpinButtonContent({
  type,
  label,
  labelledBy,
  disabled,
  cyclic,
  valueMin,
  valueMax,
  valueNow,
  valueText,
  increment,
  decrement,
  reset,
  className,
  children,
  ...props
}: SpinButtonContentProps) {
  const id = useId();
  const cl = clsx(styles.spinButton, className);
  const incrementDisabled = disabled || !cyclic && (valueNow >= valueMax);
  const decrementDisabled = disabled || !cyclic && (valueNow <= valueMin);

  const contextValue: SpinButtonContextValue = {
    id,
    type,
    label,
    labelledBy,
    valueMax,
    valueMin,
    valueNow,
    valueText,
    incrementDisabled,
    decrementDisabled,
    decrement,
    increment,
    reset,
  };

  return (
    <div className={cl} {...props}>
      <SpinButtonContext value={contextValue}>
        {children}
      </SpinButtonContext>
    </div>
  );
}