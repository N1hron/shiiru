import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import { capitalize } from "@/utils/capitalize";

import styles from "./style.module.scss";

type ButtonElement = ElementType<{ className?: string; children?: ReactNode }>;

type ButtonProps<E extends ButtonElement = "button"> = ComponentPropsWithRef<E> & {
  as?: E;
  icon?: boolean;
  size?: "large" | "medium" | "small";
  color?: "accent" | "success" | "error";
  sideways?: "bt" | "tb";
};

export function Button<E extends ButtonElement = "button">({
  as,
  icon = false,
  size = "large",
  color,
  sideways,
  className,
  children,
  ...props
}: ButtonProps<E>) {
  const Element = (as || "button") as ButtonElement;

  const cn = clsx(
    styles.button,
    icon && styles.buttonIcon,
    color && styles.buttonColored,
    color && styles[`buttonColor${capitalize(color)}`],
    styles[`buttonSize${capitalize(size)}`],
    sideways && styles[`buttonSideways${capitalize(sideways)}`],
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
