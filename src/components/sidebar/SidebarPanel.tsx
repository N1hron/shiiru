import { SidePanel, type SidePanelComponent, type SidePanelProps } from "@/components";
import { ui, useAppSelector } from "@/store";
import type { Side } from "@/types";

export type SidebarPanelProps<C extends SidePanelComponent> = Omit<SidePanelProps<C>, "side">;

export function SidebarPanel<C extends SidePanelComponent>(props: SidebarPanelProps<C>) {
  const isMobile = useAppSelector(ui.selectIsMobile);
  const side: Side = isMobile ? "right" : "left";

  return <SidePanel side={side} {...props} />;
}
