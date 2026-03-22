import type { AppState } from "@/store/types";

export const selectIsMobile = ({ ui }: AppState) => ui.isMobile;
export const selectTheme = ({ ui }: AppState) => ui.theme.current;
export const selectPreferredTheme = ({ ui }: AppState) => ui.theme.preferred;

export const selectActualTheme = (state: AppState) => {
  const theme = selectTheme(state);

  if (theme === "system") {
    return selectPreferredTheme(state);
  } else {
    return theme;
  }
};
