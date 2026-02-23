import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

type TableBodyProps = ComponentPropsWithRef<"tbody">;

export function TableBody({ className, ...props }: TableBodyProps) {
  const cn = clsx(styles.body, className);
  return <tbody className={cn} {...props} />;
}
