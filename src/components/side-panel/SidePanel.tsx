import clsx from "clsx";
import { useMemo, type ComponentPropsWithRef, type ElementType, type ReactNode } from "react";

import { SidePanelContext, type SidePanelContextValue } from "./context";
import { SidePanelMotion } from "./SidePanelMotion";
import { capitalize } from "@/utils";
import type { Side } from "@/types";

import styles from "./style.module.scss";

export type SidePanelComponent = ElementType<{ children?: ReactNode; className?: string }>;

export type SidePanelProps<C extends SidePanelComponent> = ComponentPropsWithRef<C> & {
  as?: C;
  side?: Side;
};

function SidePanel<C extends SidePanelComponent>({
  as,
  side = "left",
  className,
  children,
  ...props
}: SidePanelProps<C>) {
  const Component: SidePanelComponent = as || "div";
  const cn = clsx(styles.sidePanel, styles[`sidePanel${capitalize(side)}`], className);
  const contextValue = useMemo<SidePanelContextValue>(() => ({ side }), [side]);

  return (
    <Component className={cn} {...props}>
      <SidePanelContext value={contextValue}>
        { children }
      </SidePanelContext>
    </Component>
  );
}

SidePanel.Motion = SidePanelMotion;

export { SidePanel };
