import { createContext, use } from "react";

import type { ActivityMode } from "@/types";

export type SidebarContextValue = {
  mode: ActivityMode;
};

export const SidebarContext = createContext<SidebarContextValue>({ mode: "hidden" });
export const useSidebarContext = () => use(SidebarContext);
