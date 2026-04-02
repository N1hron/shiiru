import clsx from "clsx";

import ArrowIcon from "@/assets/icons/arrow.svg?react";
import { Button, type ButtonProps } from "../button/Button";
import { mergeHandlers } from "@/utils";

import styles from "./style.module.scss";

export type ExpandToggleProps = Omit<ButtonProps, "value"> & {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
};

export function ExpandToggle({
  expanded,
  icon,
  sideways,
  className,
  children,
  setExpanded,
  onClick,
  ...props
}: ExpandToggleProps) {
  const cn = clsx(
    styles.expandToggle,
    icon && styles.expandToggleIcon,
    expanded && styles.expandToggleChecked,
    sideways && styles.expandToggleSideways,
    className
  );

  function handleClick() {
    setExpanded(!expanded);
  }

  return (
    <Button
      className={cn}
      icon={icon}
      sideways={sideways}
      aria-expanded={expanded}
      onClick={mergeHandlers(handleClick, onClick)}
      {...props}
    >
      { children }
      <ArrowIcon className={styles.icon} aria-hidden />
    </Button>
  );
}
