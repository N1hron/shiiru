import { createContext, use } from "react";

import type { Side } from "@/types";

export type SidePanelContextValue = {
  side: Side;
};

export const SidePanelContext = createContext<SidePanelContextValue>({ side: "left" });
export const useSidePanelContext = () => use(SidePanelContext);
