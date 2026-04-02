import { Activity, type ReactNode } from "react";

import { useSidebarContext } from "./context";

export type SidebarActivityProps = {
  children: ReactNode;
};

export function SidebarActivity({ children }: SidebarActivityProps) {
  const { mode } = useSidebarContext();

  return (
    <Activity mode={mode}>
      { children }
    </Activity>
  );
}
