import { useMedia } from "./useMedia";

export function usePreferredTheme() {
  return useMedia("(prefers-color-scheme: light)") ? "light" : "dark";
}
