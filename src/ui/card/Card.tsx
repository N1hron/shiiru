import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import styles from "./style.module.scss";

export type CardComponent = ElementType<{ children?: ReactNode; className?: string }>;
export type CardProps<C extends CardComponent> = ComponentPropsWithRef<C> & { as?: C };

export function Card<C extends CardComponent = "div">({ as, className, ...props }: CardProps<C>) {
  const Component: CardComponent = as || "div";
  const cn = clsx(styles.card, className);

  return <Component className={cn} {...props} />;
}
