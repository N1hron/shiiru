import clsx from "clsx";
import type { ComponentPropsWithRef, MouseEvent } from "react";

import CheckIcon from "@/assets/icons/check.svg?react";
import { Button } from "@/ui/button";

import styles from "./style.module.scss";

type CheckboxProps = Omit<ComponentPropsWithRef<typeof Button<"button">>, "icon" | "size" | "value"> & {
  value: boolean;
  setValue: (value: boolean) => void;
};

export function Checkbox({ value, setValue, className, color = "accent", onClick, ...props }: CheckboxProps) {
  const cn = clsx(
    styles.checkbox,
    value ? styles.checkboxChecked : styles.checkboxUnchecked,
    className
  );

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setValue(!value);

    if (onClick) {
      onClick(event);
    }
  }

  return (
    <Button
      className={cn}
      icon
      color={value ? color : undefined}
      role="checkbox"
      size="small"
      aria-checked={value}
      onClick={handleClick}
      {...props}
    >
      <CheckIcon aria-hidden />
    </Button>
  );
}
