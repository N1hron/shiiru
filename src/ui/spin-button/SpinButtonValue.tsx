import clsx from "clsx";
import type { ComponentPropsWithRef, KeyboardEvent } from "react";

import { useSpinButtonContext } from "./SpinButtonContext";

import styles from "./style.module.scss";

type SpinButtonValueProps = Omit<ComponentPropsWithRef<"div">, "children">;

export function SpinButtonValue({ className, ...props }: SpinButtonValueProps) {
  const {
    id,
    label,
    labelledBy,
    disabled,
    valueMin,
    valueMax,
    valueNow,
    valueText,
    reset,
    increment,
    decrement,
  } = useSpinButtonContext();

  const cl = clsx(styles.value, className);

  function handleClick() {
    if (!disabled) {
      reset();
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!disabled) {
      const preventDefault = (fn: () => void) => {
        event.preventDefault();
        fn();
      };

      switch(event.key) {
        case "Enter":
        case " ":
          return preventDefault(reset);
        case "ArrowUp":
        case "ArrowRight":
          return preventDefault(increment);
        case "ArrowDown":
        case "ArrowLeft":
          return preventDefault(decrement);
      }
    };
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
      {valueText || valueNow}
    </div>
  );
}