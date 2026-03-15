import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

export type CardMenuItemProps = ComponentPropsWithRef<"li">;

export function CardMenuItem({ className, ...props }: CardMenuItemProps) {
  const cn = clsx(styles.menuItem, className);
  return <li className={cn} {...props} />;
}
