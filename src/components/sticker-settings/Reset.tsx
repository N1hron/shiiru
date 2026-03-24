import UndoIcon from "@/assets/icons/undo.svg?react";
import { Button, Translation, Element } from "@/ui";
import { settings, useAppDispatch } from "@/store";

import styles from "./style.module.scss";

export function Reset() {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(settings.resetItems());
  }

  return (
    <Button className={styles.reset} icon size="medium" color="accent" onClick={handleClick}>
      <UndoIcon aria-hidden />
      <Element as="span" hidden="visually">
        <Translation translationKey="stickerSettings.reset" />
      </Element>
    </Button>
  );
}
