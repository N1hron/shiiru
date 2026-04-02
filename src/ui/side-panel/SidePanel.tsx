import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import styles from "./style.module.scss";

export type SidePanelComponent = ElementType<{ children?: ReactNode; className?: string }>;
export type SidePanelProps<C extends SidePanelComponent> = ComponentPropsWithRef<C> & { as?: C };

export function SidePanel<C extends SidePanelComponent>({ as, className, ...props }: SidePanelProps<C>) {
  const Component: SidePanelComponent = as || "div";
  const cn = clsx(styles.sidePanel, className);

  return <Component className={cn} {...props} />;
}
