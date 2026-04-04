import { Element, Translation, ExpandToggle } from "@/ui";
import { ui, useAppDispatch, useAppSelector } from "@/store";
import { config } from "@/config";

import styles from "./style.module.scss";

const controls = `${config.id.header} ${config.id.footer} ${config.id.stickerSettings}`;

export function Expand() {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector(ui.selectIsSidebarVisible);
  const isMobile = useAppSelector(ui.selectIsMobile);

  if (!isMobile) {
    return null;
  }

  const setExpanded = (value: boolean) => {
    dispatch(ui.setShowSidebar(value));
  };

  return (
    <li>
      <ExpandToggle
        className={styles.expand}
        icon
        color="accent"
        size="medium"
        sideways="rl"
        aria-controls={controls}
        expanded={expanded}
        setExpanded={setExpanded}
      >
        <Element as="span" hidden="visually">
          <Translation translationKey="stickerSettings.toggle" />
        </Element>
      </ExpandToggle>
    </li>
  );
}
