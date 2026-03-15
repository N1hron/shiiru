import type { Theme } from "../types";

export function getPreferredTheme(): Theme {
  return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
