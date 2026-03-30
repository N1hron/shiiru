import clsx from "clsx";

import { Backdrop } from "@/ui";
import { ui, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function Overlay() {
  const isVisible = useAppSelector(ui.selectIsOverlayVisible);
  const cn = clsx(styles.overlay, isVisible && styles.overlayVisible);

  return <Backdrop className={cn} transparent inert={!isVisible} />;
}
