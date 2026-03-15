import { getPreferredTheme } from "./getPreferredTheme";
import type { Theme } from "../types";

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme === "system" ? getPreferredTheme() : theme;
}
