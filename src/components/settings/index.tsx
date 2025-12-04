import { StringItem } from "./StringItem";
import { config } from "@/config";

import styles from "./style.module.scss";

const items = config.settings.items;

export function Settings() {
  return (
    <div className={styles.settings}>
      {items.map((item) => {
        if (typeof item.default === "string") {
          return <StringItem key={item.name} name={item.name} />;
        }
      })}
    </div>
  );
}