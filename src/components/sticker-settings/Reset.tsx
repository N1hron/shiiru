import UndoIcon from "@/assets/icons/undo.svg?react";
import { Button, Translation, Element } from "@/ui";

export function Reset() {
  return (
    <Button icon size="medium" color="accent">
      <UndoIcon aria-hidden />
      <Element as="span" hidden="visually">
        <Translation translationKey="stickerSettings.reset" />
      </Element>
    </Button>
  );
}
