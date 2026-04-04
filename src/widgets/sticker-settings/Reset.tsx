import UndoIcon from "@/assets/icons/undo.svg?react";
import { SidePanel } from "@/components";
import { Button, Translation, Element } from "@/ui";
import { settings, ui, useAppDispatch, useAppSelector } from "@/store";
import { usePrevious } from "@/hooks";

import styles from "./style.module.scss";

export function Reset() {
  const dispatch = useAppDispatch();
  const isSidebarVisible = useAppSelector(ui.selectIsSidebarVisible);
  const shouldDelay = usePrevious(isSidebarVisible) !== isSidebarVisible;
  const isDefaultItems = useAppSelector(settings.selectIsDefaultItems);
  const mode = isSidebarVisible && !isDefaultItems ? "visible" : "hidden";
  const delay = !shouldDelay ? 0 : isSidebarVisible ? 0.5 : 0.25;

  function handleClick() {
    if (!isDefaultItems) {
      dispatch(settings.resetItems());
    }
  }

  return (
    <SidePanel.Motion as="li" mode={mode} delay={delay}>
      <Button className={styles.reset} icon size="medium" color="accent" onClick={handleClick}>
        <UndoIcon aria-hidden />
        <Element as="span" hidden="visually">
          <Translation translationKey="stickerSettings.reset" />
        </Element>
      </Button>
    </SidePanel.Motion>
  );
}
