import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

type BodyProps = ComponentPropsWithRef<"tbody">;

export function Body({ className, ...props }: BodyProps) {
  const cn = clsx(styles.body, className);
  return <tbody className={cn} {...props} />;
}
