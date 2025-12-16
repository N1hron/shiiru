import { Button } from "@/ui";
import { selectIsDownloadUrlValid, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadButton() {
  const isUrlValid = useAppSelector(selectIsDownloadUrlValid);

  if (!isUrlValid) return null;

  return <Button className={styles.downloadButton} size="medium">load</Button>;
}