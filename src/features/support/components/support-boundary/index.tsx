import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLayoutEffect, type ReactNode } from "react";
import { supportSelectors, supportThunks } from "../../slice";

export type SupportBoundaryProps = {
  children: ReactNode;
};

export function SupportBoundary({ children }: SupportBoundaryProps) {
  const dispatch = useAppDispatch();
  const isPending = useAppSelector(supportSelectors.selectIsPending);
  const isSupported = useAppSelector(supportSelectors.selectIsSupported);

  useLayoutEffect(() => {
    void dispatch(supportThunks.checkSupport());
  }, [dispatch]);

  if (isPending) {
    return "Checking browser support";
  } else if (isSupported) {
    return children;
  } else {
    return null;
  }
}
