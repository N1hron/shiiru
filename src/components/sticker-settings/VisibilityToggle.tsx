import { useState } from "react";

import { Element, Translation } from "@/ui";
import { Toggle } from "@/ui/toggle/Toggle";
import { ui, useAppSelector } from "@/store";

export function VisibilityToggle() {
  const isMobile = useAppSelector(ui.selectIsMobile);
  const [value, setValue] = useState(true);

  if (!isMobile) return null;

  return (
    <Toggle
      icon
      color="accent"
      size="medium"
      sideways="lr"
      aria-expanded={value}
      value={value}
      setValue={setValue}
    >
      <Element as="span" hidden="visually">
        <Translation translationKey="stickerSettings.toggle" />
      </Element>
    </Toggle>
  );
}
