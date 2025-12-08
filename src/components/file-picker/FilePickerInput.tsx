import { TextInput } from "@/ui";

import styles from "./style.module.scss";

export function FilePickerInput() {
  return <TextInput className={styles.input} placeholder="Enter URL or paste file" />;
}