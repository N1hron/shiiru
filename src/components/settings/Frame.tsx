import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import { Card } from "@/ui/card";

import styles from "./style.module.scss";

type SettingsFrameProps = Omit<ComponentPropsWithRef<typeof Card<"section">>, "as">;

export function SettingsFrame({ className, ...props }: SettingsFrameProps) {
  const cn = clsx(styles.settings, className);
  return <Card as="section" className={cn} {...props} />;
}
