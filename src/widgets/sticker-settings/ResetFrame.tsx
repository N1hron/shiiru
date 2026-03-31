import type { ReactNode } from "react";

import { settings, ui, useAppSelector } from "@/store";
import { usePrevious } from "@/hooks";
import { SideMotion, useSidebarMotionContext } from "@/components";

type ResetFrameProps = {
  children: ReactNode;
};

export function ResetFrame({ children }: ResetFrameProps) {
  const { isVisible: isSidebarVisible } = useSidebarMotionContext();
  const shouldDelay = usePrevious(isSidebarVisible) !== isSidebarVisible;
  const isDefaultItems = useAppSelector(settings.selectIsDefaultItems);
  const isMobile = useAppSelector(ui.selectIsMobile);
  const isVisible = isSidebarVisible && !isDefaultItems;

  return (
    <SideMotion
      side={isMobile ? "right" : "left"}
      mode={isVisible ? "visible" : "hidden"}
      delay={!shouldDelay ? 0 : isSidebarVisible ? 0.5 : 0.25}
      children={children}
    />
  );
}
