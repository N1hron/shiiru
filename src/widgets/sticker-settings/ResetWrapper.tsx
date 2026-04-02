import { SidePanel } from "@/components";
import { settings, ui, useAppSelector } from "@/store";
import { usePrevious } from "@/hooks";
import type { WrapperProps } from "@/types";

export function ResetWrapper({ children }: WrapperProps) {
  const isSidebarVisible = useAppSelector(ui.selectIsSidebarVisible);
  const shouldDelay = usePrevious(isSidebarVisible) !== isSidebarVisible;
  const isDefaultItems = useAppSelector(settings.selectIsDefaultItems);
  const mode = isSidebarVisible && !isDefaultItems ? "visible" : "hidden";
  const delay = !shouldDelay ? 0 : isSidebarVisible ? 0.5 : 0.25;

  return (
    <SidePanel.Motion as="li" mode={mode} delay={delay}>
      { children }
    </SidePanel.Motion>
  );
}
