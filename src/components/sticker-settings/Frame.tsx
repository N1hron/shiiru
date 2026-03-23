import { motion } from "motion/react";
import { type ReactNode } from "react";

import { ui, useAppSelector } from "@/store";
import { variants } from "@/animations";

import styles from "./style.module.scss";

type FrameProps = {
  headingId: string;
  children: ReactNode;
};

export function Frame({ children, headingId }: FrameProps) {
  const isVisible = useAppSelector(ui.selectIsSidebarVisible);
  const isMobile = useAppSelector(ui.selectIsMobile);

  return (
    <motion.section
      className={styles.stickerSettings}
      variants={variants.sidebar}
      animate={isVisible ? "visible" : "hidden"}
      initial={isMobile ? "hidden" : "visible"}
      aria-labelledby={headingId}
      children={children}
    />
  );
}
