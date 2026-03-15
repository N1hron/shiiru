import { useLayoutEffect, type ReactNode } from "react";

import { useAppSelector } from "@/store/hooks";
import { applyTheme } from "../../utils/applyTheme";
import { selectors } from "../../slice/selectors";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useAppSelector(selectors.selectTheme);

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return children;
}
