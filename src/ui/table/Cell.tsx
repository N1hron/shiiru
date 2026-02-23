import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

type TableElement = "td" | "th";

type TableCellProps<E extends TableElement> = ComponentPropsWithRef<E> & {
  as?: E;
  alignStart?: boolean;
};

export function TableCell<E extends TableElement = "td">({
  as,
  alignStart = false,
  className,
  ...props
}: TableCellProps<E>) {
  const Element = as || "td";
  const cn = clsx(styles.cell, alignStart && styles.cellAlignStart, className);

  return <Element className={cn} {...props} />;
}
