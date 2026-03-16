import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import { capitalize } from "@/utils/capitalize";

import styles from "./style.module.scss";

export type ButtonElement = ElementType<{ className?: string; children?: ReactNode }>;

export type ButtonProps<E extends ButtonElement = "button"> = ComponentPropsWithRef<E> & {
  as?: E;
  icon?: boolean;
  size?: "large" | "medium" | "small";
  color?: "accent" | "success" | "error";
  sideways?: "lr" | "rl";
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
    color && styles[`button${capitalize(color)}`],
    styles[`button${capitalize(size)}`],
    sideways && styles[`buttonSideways${capitalize(sideways)}`],
    className
  );

  return (
    <Element className={cn} {...props}>
      <span data-wrapper className={styles.wrapper}>
        <span data-content className={styles.content}>
          { children }
        </span>
      </span>
    </Element>
  );
}
