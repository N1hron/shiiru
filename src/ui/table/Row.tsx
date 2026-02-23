import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

type TableRowProps = ComponentPropsWithRef<"tr">;

export function TableRow({ className, ...props }: TableRowProps) {
  const cn = clsx(styles.row, className);
  return <tr className={cn} {...props} />;
}
