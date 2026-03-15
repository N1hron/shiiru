import type { Theme } from "../types";

export function isTheme(value: unknown): value is Theme {
  return (
    value === "system" ||
    value === "light" ||
    value === "dark"
  );
}
