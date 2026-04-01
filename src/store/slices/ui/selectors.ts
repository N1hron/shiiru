import type { AppState } from "@/store";

export const selectIsMobile = ({ ui }: AppState) => ui.isMobile;
export const selectShowSidebar = ({ ui }: AppState) => ui.showSidebar;
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

export const selectIsSidebarVisible = (state: AppState) => {
  return !selectIsMobile(state) || selectShowSidebar(state);
};

export const selectIsOverlayVisible = (state: AppState) => {
  return selectIsMobile(state) && selectIsSidebarVisible(state);
};

export const selectors = {
  selectIsMobile,
  selectTheme,
  selectActualTheme,
  selectIsSidebarVisible,
  selectIsOverlayVisible
};
