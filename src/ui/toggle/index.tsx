import type { MouseEvent, ReactNode } from "react";

import { Button, type ButtonProps } from "../button";

export type ToggleProps = Omit<ButtonProps, "value"> & {
  value: boolean;
  setValue: (value: boolean) => void;
  children?: ReactNode | ((value: boolean) => ReactNode);
};

export function Toggle({ value, setValue, children, onClick, ...props }: ToggleProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setValue(!value);
    onClick?.(event);
  }

  return (
    <Button aria-pressed={value} onClick={handleClick} {...props}>
      { typeof children === "function" ? children(value) : children }
    </Button>
  );
}
