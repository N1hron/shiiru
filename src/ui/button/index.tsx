import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType } from "react";

import { capitalize } from "@/utils/capitalize";

import styles from "./style.module.scss";

type ButtonElement = "a" | "button";

type ButtonProps<E extends ButtonElement = "button"> = ComponentPropsWithRef<E> & {
  as?: E;
  size?: "large" | "medium";
  color?: "accent" | "success" | "error";
  icon?: boolean;
  sideways?: "bt" | "tb";
};

export function Button<E extends ButtonElement = "button">({
  as,
  className,
  size = "large",
  color,
  icon = false,
  sideways,
  children,
  ...props
}: ButtonProps<E>) {
  const Element = (as || "button") as ElementType;

  const cn = clsx(
    styles.button,
    styles[`buttonSize${capitalize(size)}`],
    color && styles.buttonColored,
    color && styles[`buttonColor${capitalize(color)}`],
    sideways && styles[`buttonSideways${capitalize(sideways)}`],
    icon && styles.buttonIcon,
    className
  );

  return (
    <Element className={cn} {...props}>
      <span className={styles.wrapper}>
        <span className={styles.background} />
        <span className={styles.content}>{ children }</span>
      </span>
    </Element>
  );
}
