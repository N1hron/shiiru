import clsx from "clsx";
import type { KeyboardEvent } from "react";

import { Button, type ButtonProps } from "../button";
import { useSpinButton, type SpinButtonOption, type SpinButtonOptions } from "@/hooks/useSpinButton";
import type { RenderProp } from "@/types";

import styles from "./style.module.scss";

export type MultiToggleBaseProps = Omit<ButtonProps, "value" | "defaultValue" | "children">;

export type MultiToggleProps<V extends string> = MultiToggleBaseProps & SpinButtonOptions<V> & {
  children?: RenderProp<SpinButtonOption<V>>;
};

export function MultiToggle<V extends string>({
  options,
  value,
  setValue,
  className,
  disabled,
  children,
  ...props
}: MultiToggleProps<V>) {
  const { min, max, now, label, next, prev } = useSpinButton({ options, value, setValue });
  const cn = clsx(styles.multiToggle, className);

  function handleKeyDown(event: KeyboardEvent) {
    if (!disabled) {
      switch (event.key) {
        case "ArrowUp":
        case "ArrowRight":
          next();
          break;
        case "ArrowDown":
        case "ArrowLeft":
          prev();
          break;
      }
    }
  }

  return (
    <Button
      className={cn}
      role="spinbutton"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={now}
      aria-valuetext={label}
      disabled={disabled}
      onClick={next}
      onKeyDown={handleKeyDown}
      {...props}
    >
      { typeof children === "function" ? children(options[now]) : children ?? label }
    </Button>
  );
}
