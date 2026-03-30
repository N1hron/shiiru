import { createContext, use } from "react";

export type SidebarFrameContextValue = {
  isVisible: boolean;
  isExitComplete: boolean;
};

export const SidebarFrameContext = createContext<SidebarFrameContextValue>({
  isVisible: false,
  isExitComplete: false
});

export const useSidebarFrameContext = () => use(SidebarFrameContext);
