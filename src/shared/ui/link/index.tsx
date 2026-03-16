import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

type LinkProps = ComponentPropsWithRef<"a">;

export function Link({ className, ...props }: LinkProps) {
  const cn = clsx(styles.link, className);
  return <a className={cn} target="_blank" rel="noopener noreferrer" {...props} />;
}
