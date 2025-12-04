import { config } from "@/config";
import type { Settings } from "@/types";

export function getDefaultSettings() {
  const defaultSettings: Record<string, string | boolean> = {};
  for (const item of config.settings.items) {
    defaultSettings[item.name] = item.default;
  }
  return defaultSettings as Settings;
}