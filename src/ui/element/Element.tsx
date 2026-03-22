import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType } from "react";

import styles from "./style.module.scss";

export type ElementComponent = ElementType<{ className?: string }>;

export type ElementProps<C extends ElementComponent> = Omit<ComponentPropsWithRef<C>, "hidden"> & {
  as: C;
  hidden?: boolean | "visually";
};

export function Element<C extends ElementComponent>({ as, hidden, className, ...props }: ElementProps<C>) {
  const cn = clsx(styles.element, hidden === "visually" && styles.elementHiddenVisually, className);
  const Component: ElementComponent = as;

  return <Component className={cn} hidden={hidden && hidden !== "visually"} {...props} />;
}
