import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType } from "react";

import styles from "./style.module.scss";

export type LabelElement = "label" | "span";
export type LabelBaseProps<E extends LabelElement> = ComponentPropsWithRef<E>;

export type LabelProps<E extends LabelElement> = LabelBaseProps<E> & {
  as?: E;
  disabled?: boolean;
};

export function Label<E extends LabelElement = "label">({ as, disabled, className, ...props }: LabelProps<E>) {
  const Element = (as || "label") as ElementType;
  const cn = clsx(styles.label, disabled && styles.labelDisabled, className);

  return <Element className={cn} {...props} />;
}
