import { type ComponentPropsWithRef } from "react";

import { SettingsFrame } from "./Frame";
import { SettingsHeading } from "./Heading";
import { SettingsList } from "./List";
import { SettingsItemString } from "./ItemString";
import { SettingsItemBoolean } from "./ItemBoolean";
import { SettingsDivider } from "./Divider";
import { SettingsRemember } from "./Remember";
import { SettingsReset } from "./Reset";

type SettingsProps = Omit<ComponentPropsWithRef<typeof SettingsFrame>, "children">;

export function Settings(props: SettingsProps) {
  return (
    <SettingsFrame {...props}>
      <SettingsHeading />
      <SettingsList>
        <SettingsItemString name="type" values={["sticker", "emoji"]} />
        <SettingsItemString name="verticalAlignment" values={["top", "middle", "bottom"]} />
        <SettingsItemString name="horizontalAlignment" values={["left", "middle", "right"]} />
        <SettingsItemString name="resize" values={["contain", "scale-down", "fill", "cover"]} />
        <SettingsItemString name="quality" values={["auto", "very-low", "low", "medium", "high", "very-high"]} />
        <SettingsItemString name="staticFormat" values={["webp", "png"]} />
        <SettingsItemBoolean name="removeSpaces" />
        <SettingsItemBoolean name="antialiasing" />
      </SettingsList>
      <SettingsDivider />
      <SettingsRemember />
      <SettingsReset />
    </SettingsFrame>
  );
}
