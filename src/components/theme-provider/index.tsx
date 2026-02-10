import { useLayoutEffect, type ReactNode } from "react";

import { useAppSelector } from "@/store";
import { uiSelectors } from "@/store/slices/ui";
import { usePreferredTheme } from "@/hooks/usePreferredTheme";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useAppSelector(uiSelectors.selectTheme);
  const preferredTheme = usePreferredTheme();

  useLayoutEffect(() => {
    if (theme === "system") {
      document.documentElement.dataset.theme = preferredTheme;
    } else {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme, preferredTheme]);

  return children;
}
