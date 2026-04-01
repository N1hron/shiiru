import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

type HeadProps = ComponentPropsWithRef<"thead">;

export function Head({ className, ...props }: HeadProps) {
  const cn = clsx(styles.head, className);
  return <thead className={cn} {...props} />;
}
