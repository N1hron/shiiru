import { useEffect, type ReactNode } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import { supportSelectors, supportThunks } from "@/store/slices/support";

type SupportBoundaryProps = {
  children: ReactNode;
};

export function SupportBoundary({ children }: SupportBoundaryProps) {
  const dispatch = useAppDispatch();
  const isPending = useAppSelector(supportSelectors.selectIsPending);
  const isSupported = useAppSelector(supportSelectors.selectIsSupported);

  useEffect(() => {
    void dispatch(supportThunks.checkSupport());
  }, [dispatch]);

  if (isPending) {
    return "Checking browser support...";
  }

  if (isSupported) {
    return children;
  }

  return "Your browser is not supported";
}

