import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

type CellComponent = "td" | "th";

type CellProps<C extends CellComponent> = ComponentPropsWithRef<C> & {
  as?: C;
  center?: boolean;
};

export function Cell<C extends CellComponent = "td">({ as, center, className, ...props }: CellProps<C>) {
  const Component = as || "td";
  const cn = clsx(styles.cell, center && styles.cellCenter, className);

  return <Component className={cn} {...props} />;
}
