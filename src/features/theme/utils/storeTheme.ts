import { config } from "@/config";
import type { Theme } from "../types";

export function storeTheme(theme: Theme) {
  localStorage.setItem(config.storage.theme, theme);
}
