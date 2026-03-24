import type { Translation } from "@/i18n";

export const en: Translation = {
  theme: {
    toggle: "Toggle theme",
    current: "Current theme: {{theme}}",
    light: "Light",
    dark: "Dark",
    system: "System"
  },
  language: {
    toggle: "Toggle language",
    current: "Current language: {{language}}",
    en: "English",
    ru: "Russian"
  },
  spinSelect: {
    prev: "Previous value",
    next: "Next value",
    reset: "Reset value"
  },
  stickerSettings: {
    heading: "Sticker settings",
    reset: "Reset sticker settings",
    toggle: "Toggle sticker settings"
  },
  settings: {
    labels: {
      type: "Sticker type",
      verticalAlignment: "Vertical alignment",
      horizontalAlignment: "Horizontal alignment",
      antialiasingQuality: "Antialiasing quality",
      resizeMode: "Resize mode",
      removeSpaces: "Remove spaces",
      downloadZip: "Download as zip file",
      imageFormat: "Image format",
      videoQuality: "Video quality"
    },
    values: {
      type: {
        sticker: "Sticker",
        emoji: "Emoji"
      },
      verticalAlignment: {
        top: "Top",
        middle: "Middle",
        bottom: "Bottom"
      },
      horizontalAlignment: {
        left: "Left",
        middle: "Middle",
        right: "Right"
      },
      resizeMode: {
        "scale-down": "Scale down",
        contain: "Contain",
        cover: "Cover",
        fill: "Fill"
      },
      antialiasingQuality: {
        off: "Off",
        low: "Low",
        medium: "Medium",
        high: "High"
      },
      imageFormat: {
        webp: "WEBP",
        png: "PNG"
      },
      videoQuality: {
        auto: "Auto",
        "very-low": "Very low",
        low: "Low",
        medium: "Medium",
        high: "High",
        "very-high": "Very high"
      }
    }
  }
};
