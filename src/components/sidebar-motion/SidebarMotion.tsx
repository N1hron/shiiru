import clsx from "clsx";
import { useMemo, useState, type ComponentPropsWithRef } from "react";
import { motion, type AnimationDefinition, type DOMMotionComponents } from "motion/react";

import { SidebarMotionContext, type SidebarMotionContextValue } from "./Context";
import { SidebarMotionActivity } from "./SidebarMotionActivity";
import { ui, useAppSelector } from "@/store";
import { variants } from "./animations";

import styles from "./style.module.scss";

export type SidebarMotionComponent = keyof DOMMotionComponents;

export type SidebarMotionProps<C extends SidebarMotionComponent = "div"> = {
  as?: C;
  delay?: number;
} & ComponentPropsWithRef<DOMMotionComponents[C]>;

function SidebarMotion<C extends SidebarMotionComponent = "div">({
  as,
  delay,
  className,
  ...props
}: SidebarMotionProps<C>) {
  const Component = motion[as || "div"] as DOMMotionComponents["div"];
  const isVisible = useAppSelector(ui.selectIsSidebarVisible);
  const isMobile = useAppSelector(ui.selectIsMobile);
  const [isExitComplete, setIsExitComplete] = useState(false);
  const cn = clsx(styles.sidebarMotion, className);

  const contextValue = useMemo<SidebarMotionContextValue>(
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
    <SidebarMotionContext value={contextValue}>
      <Component
        className={cn}
        variants={variants}
        initial={isMobile ? "hidden" : "visible"}
        animate={isVisible ? "visible" : "hidden"}
        custom={delay}
        onAnimationComplete={handleExitComplete}
        {...props as ComponentPropsWithRef<DOMMotionComponents["div"]>}
      />
    </SidebarMotionContext>
  );
}

SidebarMotion.Activity = SidebarMotionActivity;

export { SidebarMotion };
