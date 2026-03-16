import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import { capitalize } from "@/utils/capitalize";

import styles from "./style.module.scss";

export type CardMenuBaseProps = ComponentPropsWithRef<"menu">;

export type CardMenuProps = CardMenuBaseProps & {
  position?: "left" | "right";
};

function CardMenu({ className, position = "left", ...props }: CardMenuProps) {
  const cn = clsx(
    styles.menu,
    styles[`menu${capitalize(position)}`],
    className
  );

  return <menu className={cn} {...props} />;
}

export { CardMenu };
