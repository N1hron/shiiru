import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import { toCapitalized } from "@/utils";

import styles from "./style.module.scss";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  color?: "blue" | "none";
  size?: "large" | "medium" | "small";
  icon?: boolean;
};

export function Button({ color = "blue", size = "large", icon, className, children, ...props }: ButtonProps) {
  const cl = clsx(
    styles.button,
    styles[`buttonColor${toCapitalized(color)}`],
    styles[`button${toCapitalized(size)}`],
    icon && styles.buttonIcon,
    className,
  );

  return (
    <button className={cl} {...props}>
      <span className={styles.content}>{children}</span>
    </button>
  );
}