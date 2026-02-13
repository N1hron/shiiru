import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<E extends HeadingElement> = { as: E } & ComponentPropsWithRef<E>;

export function Heading<E extends HeadingElement>({ as, className, ...props }: HeadingProps<E>) {
  const Element: HeadingElement = as;
  const cn = clsx(styles.heading, className);

  return <Element className={cn} {...props} />;
}
