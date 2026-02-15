import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType } from "react";

import styles from "./style.module.scss";

type LabelElement = "label" | "span";
type LabelProps<E extends LabelElement> = ComponentPropsWithRef<E> & {
  as?: E;
  horizontal?: boolean;
};

export function Label<E extends LabelElement = "label">({ as, horizontal, className, ...props }: LabelProps<E>) {
  const Element = (as || "label") as ElementType;
  const cn = clsx(styles.label, horizontal && styles.labelHorizontal, className);

  return <Element className={cn} {...props} />;
}
