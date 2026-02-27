import clsx from "clsx";
import type { ComponentPropsWithRef, KeyboardEvent, ReactNode } from "react";

import { Button } from "../button";
import { wrap } from "@/utils/wrap";

import styles from "./style.module.scss";

export type MultiToggleOption<V extends string> = {
  value: V;
  label: string;
};

export type MultiToggleProps<V extends string> =
  Omit<ComponentPropsWithRef<"div">, "children"> &
  Pick<ComponentPropsWithRef<typeof Button>, "icon" | "color" | "size" | "sideways"> &
  {
    options: Array<MultiToggleOption<V>>;
    value: V;
    disabled?: boolean;
    setValue: (value: V) => void;
    children?: ReactNode | ((value: V) => ReactNode);
  };

export function MultiToggle<V extends string>({
  options,
  value,
  icon,
  color,
  size,
  sideways,
  disabled,
  className,
  children,
  setValue,
  onKeyDown,
  ...props
}: MultiToggleProps<V>) {
  const index = options.findIndex((option) => option.value === value);
  const cn = clsx(styles.multiToggle, className);

  function setNext() {
    const nextIndex = wrap(0, index + 1, options.length - 1);
    setValue(options[nextIndex].value);
  }

  function setPrev() {
    const nextIndex = wrap(0, index - 1, options.length - 1);
    setValue(options[nextIndex].value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!disabled) {
      switch (event.key) {
        case " ":
        case "Enter":
        case "ArrowRight":
        case "ArrowDown":
          return setNext();
        case "ArrowLeft":
        case "ArrowUp":
          return setPrev();
      }
    }
    onKeyDown?.(event);
  }

  return (
    <div
      className={cn}
      role="radiogroup"
      aria-disabled={disabled}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <Button
        className={styles.button}
        icon={icon}
        color={color}
        size={size}
        sideways={sideways}
        aria-hidden
        tabIndex={-1}
        disabled={disabled}
        onClick={setNext}
      >
        { typeof children === "function" ? children(value) : children }
      </Button>

      {
        options.map((option) => {
          const isChecked = option.value === value;

          return (
            <div
              key={option.value}
              className={styles.option}
              role="radio"
              aria-checked={isChecked}
              tabIndex={isChecked && !disabled ? 0 : -1}
            >
              { option.label }
            </div>
          );
        })
      }
    </div>
  );
}
