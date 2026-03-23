import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

export type BackdropProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  transparent?: boolean;
};

export function Backdrop({ className, transparent, ...props }: BackdropProps) {
  const cn = clsx(styles.backdrop, transparent && styles.backdropTransparent, className);
  return <div className={cn} {...props} />;
}
