import { config } from "./config";

type KeysMatching<T extends object, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type FileData = {
  name: {
    full: string;
    stem: string;
    ext: string;
  };
  mime: string;
  size: number;
  type: "video" | "image";
  duration: number;
  width: number;
  height: number;
  url: string;
};

type ConfigSettingsItems = typeof config["settings"]["items"];
type ConfigSettingsItem = ConfigSettingsItems[number];

export type Settings = {
  [N in ConfigSettingsItem["name"]]: Extract<ConfigSettingsItem, { name: N }> extends { values: (infer V)[] } ? V : boolean;
};

export type SettingName = keyof Settings;
export type SettingValue<N extends SettingName> = Settings[N];

export type StringSettingName = KeysMatching<Settings, string>;
export type StringSettingValue<N extends StringSettingName> = Settings[N];

export type BooleanSettingName = KeysMatching<Settings, boolean>;
export type BooleanSettingValue<N extends BooleanSettingName> = Settings[N];

export type StringSettings = Pick<Settings, StringSettingName>;
export type BooleanSettings = Pick<Settings, BooleanSettingName>;
