import { motion } from "motion/react";
import type { ReactNode } from "react";

import { ui, useAppSelector } from "@/store";
import { variants } from "@/animations";

import styles from "./style.module.scss";

export type FrameProps = {
  children: ReactNode;
};

export function Frame({ children }: FrameProps) {
  const isVisible = useAppSelector(ui.selectIsSidebarVisible);
  const isMobile = useAppSelector(ui.selectIsMobile);

  return (
    <motion.header
      className={styles.header}
      variants={variants.sidebar}
      animate={isVisible ? "visible" : "hidden"}
      initial={isMobile ? "hidden" : "visible"}
      custom={{ delay: 0.0625 }}
      children={children}
    />
  );
}
