import { LS_THEME } from "@/constants";
import type { Theme } from "@/types";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem(LS_THEME);

  if (isTheme(savedTheme)) {
    return savedTheme;
  } else {
    return "system";
  }
}
