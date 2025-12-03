import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";
import { toCapitalized } from "@/utils";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  color?: "blue";
  size?: "medium";
};

export function Button({ color = "blue", size = "medium", className, children, ...props }: ButtonProps) {
  const cl = clsx(
    styles.button,
    styles[`button${toCapitalized(color)}`],
    styles[`button${toCapitalized(size)}`],
    className,
  );

  return (
    <button className={cl} {...props}>
      <span className={styles.content}>{children}</span>
    </button>
  );
}