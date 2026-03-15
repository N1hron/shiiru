import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import { CardMenu } from "./Menu";
import { CardMenuItem } from "./MenuItem";

import styles from "./style.module.scss";

export type CardElement = ElementType<{ children?: ReactNode; className?: string }>;
export type CardProps<E extends CardElement> = { as?: E } & ComponentPropsWithRef<E>;

function Card<E extends CardElement = "div">({ as, className, ...props }: CardProps<E>) {
  const Element: CardElement = as || "div";
  const cn = clsx(styles.card, className);

  return <Element className={cn} {...props} />;
}

Card.Menu = CardMenu;
Card.MenuItem = CardMenuItem;

export { Card };
