import { config } from "@/config";
import { MOBILE_BREAKPOINT } from "@/constants";
import type { Theme, ThemeActual } from "@/types";

export function getIsMobile() {
  return matchIsMobile().matches;
}

export function getPreferredTheme(): ThemeActual {
  return matchPrefersLightTheme().matches ? "light" : "dark";
}

export function getSavedTheme() {
  const theme = localStorage.getItem(config.storage.theme);
  return isTheme(theme) ? theme : null;
}

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export function matchIsMobile() {
  return matchMedia(`(max-width: ${MOBILE_BREAKPOINT}em)`);
}

export function matchPrefersLightTheme() {
  return matchMedia("(prefers-color-scheme: light)");
}

