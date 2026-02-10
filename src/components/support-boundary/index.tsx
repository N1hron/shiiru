import { useEffect, type ReactNode } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import { uiActions, uiSelectors } from "@/store/slices/ui";
import { checkSupport } from "./utils";

type SupportBoundaryProps = {
  children: ReactNode;
};

export function SupportBoundary({ children }: SupportBoundaryProps) {
  const dispatch = useAppDispatch();
  const isSupported = useAppSelector(uiSelectors.selectIsSupported);

  useEffect(() => {
    checkSupport()
      .then((isSupported) => dispatch(uiActions.setIsSupported(isSupported)))
      .catch(() => dispatch(uiActions.setIsSupported(false)));
  }, [dispatch]);

  if (isSupported === null) {
    return "Checking browser support...";
  }

  if (isSupported) {
    return children;
  }

  return "Your browser is not supported";
}

