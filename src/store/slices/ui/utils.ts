import type { Theme } from "@/types";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem("theme");

  if (isTheme(savedTheme)) {
    return savedTheme;
  } else {
    return "system";
  }
}
