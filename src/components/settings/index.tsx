import type { ComponentPropsWithRef } from "react";

import { Frame } from "./Frame";
import { Heading } from "./Heading";

type SettingsProps = Omit<ComponentPropsWithRef<typeof Frame>, "children">;

export function Settings(props: SettingsProps) {
  return (
    <Frame {...props}>
      <Heading />
    </Frame>
  );
}
