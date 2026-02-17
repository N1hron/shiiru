import { support } from "@/support";
import type { Settings } from "@/types";

export function createItemsSignature(items: Settings) {
  return Object.values(items).join("");
}

export function correctSettings(settings: Settings): Settings {
  if (!support.imageSmoothingQuality && settings.antialiasing) {
    return { ...settings, antialiasing: false };
  }
  return settings;
}

export function isSettings(value: unknown): value is Settings {
  return (
    value != null &&
    typeof value === "object" &&
    "type" in value &&
    isType(value.type) &&
    "verticalAlignment" in value &&
    isVerticalAlignment(value.verticalAlignment) &&
    "horizontalAlignment" in value &&
    isHorizontalAlignment(value.horizontalAlignment) &&
    "resize" in value &&
    isResize(value.resize) &&
    "quality" in value &&
    isQuality(value.quality) &&
    "staticFormat" in value &&
    isStaticFormat(value.staticFormat) &&
    "removeSpaces" in value &&
    typeof value.removeSpaces === "boolean" &&
    "antialiasing" in value &&
    typeof value.antialiasing === "boolean"
  );
}

function isType(value: unknown): value is Settings["type"] {
  return value === "sticker" || value === "emoji";
}

function isVerticalAlignment(value: unknown): value is Settings["verticalAlignment"] {
  return value === "top" || value === "middle" || value === "bottom";
}

function isHorizontalAlignment(value: unknown): value is Settings["horizontalAlignment"] {
  return value === "left" || value === "middle" || value === "right";
}

function isResize(value: unknown): value is Settings["resize"] {
  return (
    value === "fill" ||
    value === "contain" ||
    value === "cover" ||
    value === "scale-down"
  );
}

function isQuality(value: unknown): value is Settings["quality"] {
  return (
    value === "very-low" ||
    value === "low" ||
    value === "medium" ||
    value === "high" ||
    value === "very-high" ||
    value === "auto"
  );
}

function isStaticFormat(value: unknown): value is Settings["staticFormat"] {
  return value === "png" || value === "webp";
}
