import clsx from "clsx";
import { useMemo, useState, type ComponentPropsWithRef } from "react";
import { motion, type VariantLabels, type DOMMotionComponents } from "motion/react";

import { SidebarContext, type SidebarContextValue } from "./context";
import { SidebarActivity } from "./SidebarActivity";
import { SidebarPanel } from "./SidebarPanel";
import { ui, useAppSelector } from "@/store";
import { variants } from "./animations";

import styles from "./style.module.scss";

export type SidebarComponent = keyof DOMMotionComponents;

export type SidebarProps<C extends SidebarComponent = "div"> = {
  as?: C;
  delay?: number;
} & ComponentPropsWithRef<DOMMotionComponents[C]>;

function Sidebar<C extends SidebarComponent = "div">({
  as,
  delay,
  className,
  ...props
}: SidebarProps<C>) {
  const [isExitComplete, setIsExitComplete] = useState(false);
  const Component = motion[as || "div"] as DOMMotionComponents["div"];
  const isVisible = useAppSelector(ui.selectIsSidebarVisible);
  const isMobile = useAppSelector(ui.selectIsMobile);
  const mode = !isVisible && isExitComplete ? "hidden" : "visible";
  const contextValue = useMemo<SidebarContextValue>(() => ({ mode }), [mode]);
  const cn = clsx(styles.sidebarMotion, className);

  function handleExitComplete(variant: VariantLabels) {
    if (variant === "hidden") {
      setIsExitComplete(true);
    } else if (variant === "visible") {
      setIsExitComplete(false);
    }
  }

  return (
    <SidebarContext value={contextValue}>
      <Component
        className={cn}
        variants={variants}
        initial={isMobile ? "hidden" : "visible"}
        animate={isVisible ? "visible" : "hidden"}
        custom={delay}
        onAnimationComplete={handleExitComplete}
        {...props as ComponentPropsWithRef<DOMMotionComponents["div"]>}
      />
    </SidebarContext>
  );
}

Sidebar.Panel = SidebarPanel;
Sidebar.Activity = SidebarActivity;

export { Sidebar };
