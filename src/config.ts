type SettingsItemBase = {
  name: string;
  label: string;
};

type SettingsItemString<T extends string> = SettingsItemBase & {
  values: T[];
  default: T;
};

type SettingsItemBoolean = SettingsItemBase & {
  default: boolean;
};

export const config = {
  settings: {
    items: [
      {
        name: "sizeType",
        label: "Size type",
        values: ["sticker", "emoji"],
        default: "sticker",
      } as const satisfies SettingsItemString<"sticker" | "emoji">,
      {
        name: "verticalAlignment",
        label: "Vertical alignment",
        values: ["top", "middle", "bottom"],
        default: "middle",
      } as const satisfies SettingsItemString<"top" | "middle" | "bottom">,
      {
        name: "horizontalAlignment",
        label: "Horizontal alignment",
        values: ["left", "middle", "right"],
        default: "middle",
      } as const satisfies SettingsItemString<"left" | "middle" | "right">,
      {
        name: "resizeMode",
        label: "Resize Mode",
        values: ["fill", "contain", "cover", "scale down"],
        default: "scale down",
      } as const satisfies SettingsItemString<"fill" | "contain" | "cover" | "scale down">,
      {
        name: "trim",
        label: "Remove empty spaces if possible",
        default: true,
      } as const satisfies SettingsItemBoolean,
    ] as const,
  } as const,
};
