import { config } from "@/config";
import type { Theme } from "@/types";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export function getInitialTheme(): Theme {
  const theme = localStorage.getItem(config.storage.theme);

  if (isTheme(theme)) {
    return theme;
  } else {
    return "system";
  }
}
