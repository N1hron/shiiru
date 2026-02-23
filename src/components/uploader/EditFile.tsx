import { useTranslation } from "react-i18next";

import CropIcon from "@/assets/icons/crop.svg?react";
import { Button } from "@/ui/button";

import styles from "./style.module.scss";

type UploaderEditFileProps = {
  id: string;
};

export function UploaderEditFile({ id }: UploaderEditFileProps) {
  const { t } = useTranslation();

  function handleClick() {
    console.log("Edit file", id);
  }

  return (
    <Button className={styles.editFile} icon size="medium" color="accent" onClick={handleClick}>
      <CropIcon title={t("uploader.file.edit")} />
    </Button>
  );
}
