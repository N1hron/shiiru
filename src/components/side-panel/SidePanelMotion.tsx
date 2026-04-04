import { motion, type DOMMotionComponents } from "motion/react";
import { type ComponentPropsWithRef } from "react";

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
  mode = "visible",
  delay,
  ...props
}: SidePanelMotionProps<C>) {
  const Component = motion[as || "div"] as DOMMotionComponents["div"];
  const { side } = useSidePanelContext();
  const custom = { side, delay };

  return (
    <Component
      variants={variants}
      custom={custom}
      initial={mode}
      animate={mode}
      inert={mode === "hidden"}
      aria-hidden={mode === "hidden"}
      {...props as ComponentPropsWithRef<DOMMotionComponents["div"]>}
    />
  );
}
