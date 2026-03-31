import { Activity, type ReactNode } from "react";

import { useSidebarMotionContext } from "./Context";
import type { ActivityMode } from "@/types";

export type SidebarMotionActivityProps = {
  children: ReactNode;
};

export function SidebarMotionActivity({ children }: SidebarMotionActivityProps) {
  const { isVisible, isExitComplete } = useSidebarMotionContext();
  const mode: ActivityMode = !isVisible && isExitComplete ? "hidden" : "visible";

  return <Activity mode={mode} children={children} />;
}
