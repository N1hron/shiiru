import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

type DividerProps = ComponentPropsWithRef<"div">;

export function Divider({ className, ...props }: DividerProps) {
  const cn = clsx(styles.divider, className);
  return <div className={cn} {...props} />;
}
