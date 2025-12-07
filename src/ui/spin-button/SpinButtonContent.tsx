import clsx from "clsx";
import { useId, type ComponentPropsWithRef } from "react";

import { SpinButtonContext, type SpinButtonContextValue } from "./SpinButtonContext";

import styles from "./style.module.scss";

type SpinButtonContentProps = ComponentPropsWithRef<"div"> & Omit<SpinButtonContextValue, "id">;

export function SpinButtonContent({
  type,
  label,
  labelledBy,
  disabled,
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

  const contextValue: SpinButtonContextValue = {
    id,
    type,
    label,
    labelledBy,
    disabled,
    valueMax,
    valueMin,
    valueNow,
    valueText,
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