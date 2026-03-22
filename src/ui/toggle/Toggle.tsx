import clsx from "clsx";

import ArrowIcon from "@/assets/icons/arrow.svg?react";
import { Button, type ButtonProps } from "../button/Button";
import { mergeHandlers } from "@/utils";

import styles from "./style.module.scss";

export type ToggleProps = Omit<ButtonProps, "value"> & {
  value: boolean;
  setValue: (value: boolean) => void;
};

export function Toggle({
  value,
  icon,
  sideways,
  className,
  children,
  setValue,
  onClick,
  ...props
}: ToggleProps) {
  const cn = clsx(
    styles.toggle,
    icon && styles.toggleIcon,
    value && styles.toggleChecked,
    sideways && styles.toggleSideways,
    className
  );

  function handleClick() {
    setValue(!value);
  }

  return (
    <Button
      className={cn}
      icon={icon}
      sideways={sideways}
      onClick={mergeHandlers(handleClick, onClick)}
      {...props}
    >
      { children }
      <ArrowIcon className={styles.icon} aria-hidden />
    </Button>
  );
}
