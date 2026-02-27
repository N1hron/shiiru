import { useTranslation } from "react-i18next";

import XMarkIcon from "@/assets/icons/xmark.svg?react";
import { Button } from "@/ui/button";
import { useAppDispatch } from "@/store";
import { uploaderActions } from "@/store/slices/uploader";

import styles from "./style.module.scss";

type UploaderRemoveFileProps = {
  file: {
    id: string;
    name: string;
  };
};

export function UploaderRemoveFile({ file }: UploaderRemoveFileProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  function handleClick() {
    dispatch(uploaderActions.removeFile(file.id));
  }

  return (
    <Button
      className={styles.removeFile}
      icon
      size="medium"
      color="error"
      aria-label={t("uploader.file.removeName", { name: file.name })}
      title={t("uploader.file.remove")}
      onClick={handleClick}
    >
      <XMarkIcon />
    </Button>
  );
}
