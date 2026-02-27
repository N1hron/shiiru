import type { SettingsItemsTranslation } from "../types";

export const en = {
  theme: {
    toggle: "Toggle theme",
    light: "Light theme",
    dark: "Dark theme",
    system: "System theme"
  },
  language: {
    toggle: "Toggle language",
    en: "English language",
    ru: "Russian language"
  },
  settings: {
    heading: "Settings",
    remember: "Remember choice",
    reset: "Reset settings",
    items: {
      type: {
        label: "Sticker type",
        options: {
          sticker: "Sticker",
          emoji: "Emoji"
        }
      },
      verticalAlignment: {
        label: "Vertical alignment",
        options: {
          top: "Top",
          middle: "Middle",
          bottom: "Bottom"
        }
      },
      horizontalAlignment: {
        label: "Horizontal alignment",
        options: {
          left: "Left",
          middle: "Middle",
          right: "Right"
        }
      },
      resize: {
        label: "Resize mode",
        options: {
          contain: "Contain",
          "scale-down": "Scale down",
          cover: "Cover",
          fill: "Fill"
        }
      },
      quality: {
        label: "Quality",
        options: {
          auto: "Auto",
          "very-low": "Very low",
          low: "Low",
          medium: "Medium",
          high: "High",
          "very-high": "Very high"
        }
      },
      staticFormat: {
        label: "Static format",
        options: {
          webp: "Webp",
          png: "Png"
        }
      },
      removeSpaces: {
        label: "Remove spaces"
      },
      antialiasing: {
        label: "Enable antialiasing"
      },
      allowDuplicates: {
        label: "Allow duplicates"
      }
    } satisfies SettingsItemsTranslation
  },
  uploader: {
    selectFiles: "Select files",
    file: {
      name: "Name",
      type: "Type",
      remove: "Remove file",
      removeName: "Remove file {{name}}",
      edit: "Edit file",
      editName: "Edit file {{name}}",
      showPreview: "Show file preview",
      hidePreview: "Hide file preview",
      togglePreview: "Toggle preview for file {{name}}"
    },
    status: {
      ready: "Drag & Drop images and videos",
      valid: "Valid files",
      valid_one: "Valid file",
      invalid: "Invalid files",
      invalid_one: "Invalid file",
      uploading: "Uploading files",
      uploading_one: "Uploading file",
      limitReached: "File limit reached"
    }
  },
  spinSelect: {
    prev: "Previous value",
    next: "Next value",
    reset: "Reset value"
  }
};
