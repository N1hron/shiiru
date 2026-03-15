import { config } from "@/config";
import { isTheme } from "./isTheme";
import type { Theme } from "../types";

export function getStoredTheme(): Theme | null {
  const theme = localStorage.getItem(config.storage.theme);
  return isTheme(theme) ? theme : null;
}
