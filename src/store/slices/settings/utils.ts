import { config } from "@/config";
import type { Settings } from "@/types";

export function isSettings(value: unknown): value is Settings {
  const values = config.settings.values;

  return (
    value != null &&
    typeof value === "object" &&
    "type" in value &&
    values.type.includes(value.type as Settings["type"]) &&
    "verticalAlignment" in value &&
    values.verticalAlignment.includes(value.verticalAlignment as Settings["verticalAlignment"]) &&
    "horizontalAlignment" in value &&
    values.horizontalAlignment.includes(value.horizontalAlignment as Settings["horizontalAlignment"]) &&
    "resizeMode" in value &&
    values.resizeMode.includes(value.resizeMode as Settings["resizeMode"]) &&
    "antialiasingQuality" in value &&
    values.antialiasingQuality.includes(value.antialiasingQuality as Settings["antialiasingQuality"]) &&
    "removeSpaces" in value &&
    typeof value.removeSpaces === "boolean" &&
    "imageFormat" in value &&
    values.imageFormat.includes(value.imageFormat as Settings["imageFormat"]) &&
    "videoQuality" in value &&
    values.videoQuality.includes(value.videoQuality as Settings["videoQuality"]) &&
    "downloadZip" in value &&
    typeof value.downloadZip === "boolean"
  );
}
