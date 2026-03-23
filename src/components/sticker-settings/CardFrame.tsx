import { type ReactNode } from "react";

import { Card } from "@/ui";
import { ui, useAppSelector } from "@/store";

import styles from "./style.module.scss";

type CardFrameProps = {
  id: string;
  children: ReactNode;
};

export function CardFrame({ id, children }: CardFrameProps) {
  const isVisible = useAppSelector(ui.selectIsSidebarVisible);

  return <Card id={id} className={styles.card} inert={!isVisible}>{ children }</Card>;
}
