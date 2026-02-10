import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import { Card } from "@/ui/card";

import styles from "./style.module.scss";

type FrameProps = Omit<ComponentPropsWithRef<typeof Card>, "as">;

export function Frame({ className, ...props }: FrameProps) {
  const cn = clsx(styles.settings, className);
  return <Card as="section" className={cn} {...props} />;
}
