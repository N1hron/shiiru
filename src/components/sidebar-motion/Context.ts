import { createContext, use } from "react";

export type SidebarMotionContextValue = {
  isVisible: boolean;
  isExitComplete: boolean;
};

export const SidebarMotionContext = createContext<SidebarMotionContextValue>({
  isVisible: false,
  isExitComplete: false
});

export const useSidebarMotionContext = () => use(SidebarMotionContext);
