import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

import { ui, useAppSelector } from "@/store";
import { variants } from "@/animations";

type ResetFrameProps = {
  children: ReactNode;
};

export function ResetFrame({ children }: ResetFrameProps) {
  const isVisible = useAppSelector(ui.selectIsSidebarVisible);
  const isMobile = useAppSelector(ui.selectIsMobile);
  const custom = isMobile ? { side: "right", delay: 0.25 } : { side: "left", delay: 0.5 };

  return (
    <AnimatePresence custom={custom}>
      { isVisible && (
        <motion.li
          variants={variants.button}
          initial="hidden"
          animate="visible"
          exit="hidden"
          custom={custom}
        >
          { children }
        </motion.li>
      ) }
    </AnimatePresence>
  );
}
