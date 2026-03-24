import { motion } from "motion/react";
import type { ReactNode } from "react";

import { Card } from "@/ui";
import { ui, useAppSelector } from "@/store";
import { variants } from "@/animations";

import styles from "./style.module.scss";

const MotionCard = motion.create(Card<"footer">);

type FrameProps = {
  children: ReactNode;
};

export function Frame({ children }: FrameProps) {
  const isVisible = useAppSelector(ui.selectIsSidebarVisible);
  const isMobile = useAppSelector(ui.selectIsMobile);

  return (
    <MotionCard
      as="footer"
      className={styles.footer}
      variants={variants.sidebar}
      animate={isVisible ? "visible" : "hidden"}
      initial={isMobile ? "hidden" : "visible"}
      custom={{ delay: 0.0625 }}
      inert={!isVisible}
      children={children}
    />
  );
}
