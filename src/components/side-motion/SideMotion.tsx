import { AnimatePresence, motion, type DOMMotionComponents } from "motion/react";
import type { ComponentPropsWithRef } from "react";

import { variants } from "./animations";
import type { ActivityMode, Side } from "@/types";

export type SideMotionComponent = keyof DOMMotionComponents;

export type SideMotionProps<C extends SideMotionComponent = "div"> = {
  as?: C;
  side: Side;
  delay?: number;
  mode?: ActivityMode;
} & Omit<ComponentPropsWithRef<DOMMotionComponents[C]>, "mode">;

export function SideMotion<C extends SideMotionComponent = "div">({
  as,
  side,
  delay,
  mode,
  ...props
}: SideMotionProps<C>) {
  const Component = motion[as || "div"] as DOMMotionComponents["div"];
  const custom = { side, delay };

  return (
    <AnimatePresence initial={false} custom={custom}>
      { mode === "visible" && (
        <Component
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          custom={custom}
          {...props as ComponentPropsWithRef<DOMMotionComponents["div"]>}
        />
      ) }
    </AnimatePresence>
  );
}
