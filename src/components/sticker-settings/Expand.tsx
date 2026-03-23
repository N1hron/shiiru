import { Element, Translation } from "@/ui";
import { Toggle } from "@/ui/toggle/Toggle";
import { ui, useAppDispatch, useAppSelector } from "@/store";

import styles from "./style.module.scss";

type ExpandProps = {
  cardId: string;
};

export function Expand({ cardId }: ExpandProps) {
  const dispatch = useAppDispatch();
  const value = useAppSelector(ui.selectIsSidebarVisible);

  function setValue(value: boolean) {
    dispatch(ui.setShowSidebar(value));
  }

  return (
    <Toggle
      className={styles.expand}
      icon
      color="accent"
      size="medium"
      sideways="rl"
      aria-controls={cardId}
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
