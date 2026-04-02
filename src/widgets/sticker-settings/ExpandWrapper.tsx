import { ui, useAppSelector } from "@/store";
import type { WrapperProps } from "@/types";

export function ExpandWrapper({ children }: WrapperProps) {
  const isMobile = useAppSelector(ui.selectIsMobile);

  if (!isMobile) return null;
  return <li>{ children }</li>;
}
