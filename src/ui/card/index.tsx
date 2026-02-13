import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import { Heading } from "./Heading";

import styles from "./style.module.scss";

type CardElement = ElementType<{ children?: ReactNode; className?: string }>;
type CardProps<E extends CardElement> = { as?: E } & ComponentPropsWithRef<E>;

function Card<E extends CardElement = "div">({ as, className, ...props }: CardProps<E>) {
  const Element: CardElement = as || "div";
  const cn = clsx(styles.card, className);

  return <Element className={cn} {...props} />;
}

Card.Heading = Heading;

export { Card };
