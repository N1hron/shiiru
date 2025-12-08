import clsx from "clsx";
import type { ComponentPropsWithRef, KeyboardEvent } from "react";

import { useSpinButtonContext } from "./SpinButtonContext";

import styles from "./style.module.scss";

type SpinButtonValueProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  suffix?: string;
};

export function SpinButtonValue({ suffix = "", className, ...props }: SpinButtonValueProps) {
  const {
    id,
    label,
    labelledBy,
    incrementDisabled,
    decrementDisabled,
    valueMin,
    valueMax,
    valueNow,
    valueText,
    reset,
    increment,
    decrement,
  } = useSpinButtonContext();

  const disabled = decrementDisabled && incrementDisabled;
  const cl = clsx(styles.value, className);

  function handleClick() {
    if (disabled) return;

    reset();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (disabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      return reset();
    }

    if ((event.key === "ArrowUp" || event.key === "ArrowRight") && !incrementDisabled) {
      event.preventDefault();
      return increment();
    }

    if ((event.key === "ArrowDown" || event.key === "ArrowLeft") && !decrementDisabled) {
      event.preventDefault();
      return decrement();
    }
  }

  return (
    <div
      className={cl}
      id={id}
      role="spinbutton"
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-valuemin={valueMin}
      aria-valuemax={valueMax}
      aria-valuenow={valueNow}
      aria-valuetext={valueText}
      aria-disabled={disabled}
      title="Reset"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {(valueText || valueNow) + suffix}
    </div>
  );
}