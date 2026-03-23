import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import { capitalize } from "@/utils/capitalize";

import styles from "./style.module.scss";

export type ButtonComponent = ElementType<{ className?: string; children?: ReactNode }>;

export type ButtonProps<C extends ButtonComponent = "button"> = ComponentPropsWithRef<C> & {
  as?: C;
  icon?: boolean;
  size?: "large" | "medium" | "small";
  color?: "accent" | "success" | "error";
  sideways?: "lr" | "rl";
};

export function Button<C extends ButtonComponent = "button">({
  as,
  color,
  sideways,
  icon = false,
  size = "large",
  className,
  children,
  ...props
}: ButtonProps<C>) {
  const Component: ButtonComponent = (as || "button");

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
    <Component className={cn} {...props}>
      <span className={styles.background} />
      <span className={clsx(styles.contentWrapper, "button-content-wrapper")}>
        <span className={clsx(styles.content, "button-content")}>
          { children }
        </span>
      </span>
    </Component>
  );
}
