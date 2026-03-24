import clsx from "clsx";

import CheckIcon from "@/assets/icons/check.svg?react";
import { Button, type ButtonProps } from "../button/Button";
import { mergeHandlers } from "@/utils";

import styles from "./style.module.scss";

export type CheckboxProps = Omit<ButtonProps, "value" | "children"> & {
  value: boolean;
  setValue: (value: boolean) => void;
};

export function Checkbox({ color = "accent", value, className, setValue, onClick, ...props }: CheckboxProps) {
  const cn = clsx(styles.checkbox, value && styles.checkboxChecked, className);

  function handleClick() {
    setValue(!value);
  }

  return (
    <Button
      className={cn}
      icon
      size="small"
      color={value ? color : undefined}
      role="checkbox"
      aria-checked={value}
      onClick={mergeHandlers(handleClick, onClick)}
      {...props}
    >
      <CheckIcon className={styles.icon} aria-hidden />
    </Button>
  );
}
