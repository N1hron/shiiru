import { Element, Translation } from "@/ui";
import { Toggle } from "@/ui/toggle/Toggle";
import { ui, useAppDispatch, useAppSelector } from "@/store";
import { config } from "@/config";

import styles from "./style.module.scss";

const controls = `${config.id.header} ${config.id.footer} ${config.id.stickerSettings}`;

export function Expand() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(ui.selectIsSidebarVisible);

  function setValue(value: boolean) {
    dispatch(ui.setShowSidebar(value));
  }

  return (
    <Toggle
      className={styles.expand}
      icon
      showArrow
      color="accent"
      size="medium"
      sideways="rl"
      aria-controls={controls}
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
