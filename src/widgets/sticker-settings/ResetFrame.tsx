import { SideMotion, useSidebarMotionContext } from "@/components";
import { settings, ui, useAppSelector } from "@/store";
import { usePrevious } from "@/hooks";
import type { FrameProps } from "@/types";

export function ResetFrame({ children }: FrameProps) {
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
