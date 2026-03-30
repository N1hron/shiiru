import { motion, type AnimationDefinition, type DOMMotionComponents } from "motion/react";
import { useMemo, useState, type ComponentPropsWithRef } from "react";

import { variants } from "@/animations";
import { ui, useAppSelector } from "@/store";
import { SidebarFrameContext, type SidebarFrameContextValue } from "./SidebarFrameContext";

export type SidebarFrameComponent = keyof DOMMotionComponents;

type SidebarFrameProps<C extends SidebarFrameComponent> = {
  as: C;
  delay?: number;
} & ComponentPropsWithRef<DOMMotionComponents[C]>;

export function SidebarFrame<C extends SidebarFrameComponent>({ as, delay, ...props }: SidebarFrameProps<C>) {
  const Component = motion[as] as DOMMotionComponents["div"];
  const isVisible = useAppSelector(ui.selectIsSidebarVisible);
  const isMobile = useAppSelector(ui.selectIsMobile);
  const [isExitComplete, setIsExitComplete] = useState(false);

  const contextValue = useMemo<SidebarFrameContextValue>(
    () => ({ isVisible, isExitComplete }),
    [isVisible, isExitComplete]
  );

  function handleExitComplete(definition: AnimationDefinition) {
    if (definition === "hidden") {
      setIsExitComplete(true);
    } else if (definition === "visible") {
      setIsExitComplete(false);
    }
  }

  return (
    <SidebarFrameContext value={contextValue}>
      <Component
        variants={variants.sidebar}
        initial={isMobile ? "hidden" : "visible"}
        animate={isVisible ? "visible" : "hidden"}
        custom={{ delay }}
        onAnimationComplete={handleExitComplete}
        {...props as ComponentPropsWithRef<DOMMotionComponents["div"]>}
      />
    </SidebarFrameContext>
  );
}
