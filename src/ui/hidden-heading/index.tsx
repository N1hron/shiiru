import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

export type HiddenHeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HiddenHeadingProps<E extends HiddenHeadingElement> = { as: E } & ComponentPropsWithRef<E>;

export function HiddenHeading<E extends HiddenHeadingElement>({ as, className, ...props }: HiddenHeadingProps<E>) {
  const Element: HiddenHeadingElement = as;
  const cn = clsx(styles.hiddenHeading, className);

  return <Element className={cn} {...props} />;
}
