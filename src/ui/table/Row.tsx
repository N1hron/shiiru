import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

type RowProps = ComponentPropsWithRef<"tr">;

export function Row({ className, ...props }: RowProps) {
  const cn = clsx(styles.row, className);
  return <tr className={cn} {...props} />;
}
