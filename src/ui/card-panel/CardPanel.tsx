import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import styles from "./style.module.scss";

export type CardPanelComponent = ElementType<{ children?: ReactNode; className?: string }>;
export type CardPanelProps<C extends CardPanelComponent> = ComponentPropsWithRef<C> & { as?: C };

export function CardPanel<C extends CardPanelComponent>({ as, className, ...props }: CardPanelProps<C>) {
  const Component: CardPanelComponent = as || "div";
  const cn = clsx(styles.cardPanel, className);

  return <Component className={cn} {...props} />;
}
