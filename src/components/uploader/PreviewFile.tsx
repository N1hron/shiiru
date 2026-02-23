import { useTranslation } from "react-i18next";

import EyeIcon from "@/assets/icons/eye.svg?react";
import { Button } from "@/ui/button";

import styles from "./style.module.scss";

type UploaderPreviewFileProps = {
  id: string;
};

export function UploaderPreviewFile({ id }: UploaderPreviewFileProps) {
  const { t } = useTranslation();

  function handleClick() {
    console.log("Preview file", id);
  }

  return (
    <Button className={styles.previewFile} icon size="medium" color="accent" onClick={handleClick}>
      <EyeIcon title={t("uploader.file.preview.show")} />
    </Button>
  );
}
