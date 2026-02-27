import { useTranslation } from "react-i18next";

import CropIcon from "@/assets/icons/crop.svg?react";
import { Button } from "@/ui/button";

import styles from "./style.module.scss";

type UploaderEditFileProps = {
  file: {
    id: string;
    name: string;
  };
};

export function UploaderEditFile({ file }: UploaderEditFileProps) {
  const { t } = useTranslation();

  function handleClick() {
    console.log("Edit file", file.id);
  }

  return (
    <Button
      className={styles.editFile}
      icon
      size="medium"
      color="accent"
      aria-label={t("uploader.file.editName", { name: file.name })}
      title={t("uploader.file.edit")}
      onClick={handleClick}
    >
      <CropIcon />
    </Button>
  );
}
