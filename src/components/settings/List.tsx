import type { ReactNode } from "react";

import styles from "./style.module.scss";

type SettingsListProps = {
  children: ReactNode;
};

export function SettingsList({ children }: SettingsListProps) {
  return <ul className={styles.list}>{ children }</ul>;
}
