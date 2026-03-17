import { useLayoutEffect } from "react";

import { useAppSelector } from "@/store/hooks";
import { applyTheme } from "../../utils/applyTheme";
import { themeSelectors } from "../../slice";

export function DataTheme() {
  const theme = useAppSelector(themeSelectors.selectTheme);

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return null;
}
