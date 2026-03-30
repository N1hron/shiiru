import type { ReactNode } from "react";

import { ui, useAppSelector } from "@/store";

type ExpandFrameProps = {
  children: ReactNode;
};

export function ExpandFrame({ children }: ExpandFrameProps) {
  const isMobile = useAppSelector(ui.selectIsMobile);

  if (!isMobile) return null;
  return <li>{ children }</li>;
}
