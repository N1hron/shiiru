import { useLayoutEffect } from "react";

import { useAppSelector } from "@/store/hooks";
import { applyTheme } from "../../utils/applyTheme";
import { selectors } from "../../slice/selectors";

export function DataTheme() {
  const theme = useAppSelector(selectors.selectTheme);

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return null;
}
