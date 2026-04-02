import { AnimatePresence, motion, type DOMMotionComponents } from "motion/react";
import type { ComponentPropsWithRef } from "react";

import { variants } from "./animations";
import { useSidePanelContext } from "./context";
import type { ActivityMode } from "@/types";

export type SidePanelMotionComponent = keyof DOMMotionComponents;

export type SidePanelMotionProps<C extends SidePanelMotionComponent = "div"> = {
  as?: C;
  mode?: ActivityMode;
  delay?: number;
} & Omit<ComponentPropsWithRef<DOMMotionComponents[C]>, "mode">;

export function SidePanelMotion<C extends SidePanelMotionComponent = "div">({
  as,
  mode,
  delay,
  ...props
}: SidePanelMotionProps<C>) {
  const { side } = useSidePanelContext();
  const Component = motion[as || "div"] as DOMMotionComponents["div"];
  const custom = { side, delay };

  return (
    <AnimatePresence initial={false} custom={custom}>
      { mode === "visible" && (
        <Component
          variants={variants}
          custom={custom}
          initial="hidden"
          animate="visible"
          exit="hidden"
          {...props as ComponentPropsWithRef<DOMMotionComponents["div"]>}
        />
      ) }
    </AnimatePresence>
  );
}
