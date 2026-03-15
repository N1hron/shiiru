import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

export type CardMenuProps = ComponentPropsWithRef<"menu">;

function CardMenu({ className, ...props }: CardMenuProps) {
  const cn = clsx(styles.menu, className);
  return <menu className={cn} {...props} />;
}

export { CardMenu };
