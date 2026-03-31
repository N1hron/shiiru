import { ui, useAppSelector } from "@/store";
import type { FrameProps } from "@/types";

export function ExpandFrame({ children }: FrameProps) {
  const isMobile = useAppSelector(ui.selectIsMobile);

  if (!isMobile) return null;
  return <li>{ children }</li>;
}
