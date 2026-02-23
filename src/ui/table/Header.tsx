import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

type TableHeaderProps = ComponentPropsWithRef<"thead">;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  const cn = clsx(styles.header, className);
  return <thead className={cn} {...props} />;
}
