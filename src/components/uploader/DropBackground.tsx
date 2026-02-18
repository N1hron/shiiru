import type { ReactNode } from "react";

import styles from "./style.module.scss";

type UploaderDropBackgroundProps = {
  children: ReactNode;
};

export function UploaderDropBackground({ children }: UploaderDropBackgroundProps) {
  return (
    <div className={styles.dropBackground}>
      { children }
    </div>
  );
}
