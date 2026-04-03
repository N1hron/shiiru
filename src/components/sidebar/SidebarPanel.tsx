import { SidePanel, type SidePanelComponent, type SidePanelProps, type SidePanelSide } from "@/components";

export type SidebarPanelProps<C extends SidePanelComponent> = Omit<SidePanelProps<C>, "side">;

const side: SidePanelSide = { mobile: "right", desktop: "left" };

export function SidebarPanel<C extends SidePanelComponent>(props: SidebarPanelProps<C>) {
  return <SidePanel side={side} {...props} />;
}
