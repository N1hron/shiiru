import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

import { settings, ui, useAppSelector } from "@/store";
import { variants } from "@/animations";
import { usePrevious } from "@/hooks";

type ResetFrameProps = {
  children: ReactNode;
};

export function ResetFrame({ children }: ResetFrameProps) {
  const isSidebarVisible = useAppSelector(ui.selectIsSidebarVisible);
  const prevIsSidebarVisible = usePrevious(isSidebarVisible);
  const isDefaultItems = useAppSelector(settings.selectIsDefaultItems);
  const isMobile = useAppSelector(ui.selectIsMobile);
  const isVisible = isSidebarVisible && !isDefaultItems;
  const shouldDelay = prevIsSidebarVisible !== isSidebarVisible;

  const custom = (
    isMobile ? {
      side: "right",
      delay: !shouldDelay ? 0 : isSidebarVisible ? 0.5 : 0.25
    } : {
      side: "left"
    }
  );

  return (
    <AnimatePresence custom={custom}>
      { isVisible && (
        <motion.li
          variants={variants.button}
          initial="hidden"
          animate="visible"
          exit="hidden"
          custom={custom}
          children={children}
        />
      ) }
    </AnimatePresence>
  );
}
