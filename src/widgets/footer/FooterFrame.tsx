import type { ReactNode } from "react";

import { Card } from "@/ui";
import { useSidebarFrameContext } from "@/components";

type FooterFrameProps = {
  children: ReactNode;
};

export function FooterFrame({ children }: FooterFrameProps) {
  const { isVisible, isExitComplete } = useSidebarFrameContext();

  if (!isVisible && isExitComplete) {
    return null;
  }

  return <Card as="footer" children={children} />;
}
