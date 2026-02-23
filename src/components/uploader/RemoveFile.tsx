import { useTranslation } from "react-i18next";

import XMarkIcon from "@/assets/icons/xmark.svg?react";
import { Button } from "@/ui/button";
import { useAppDispatch } from "@/store";
import { uploaderActions } from "@/store/slices/uploader";

import styles from "./style.module.scss";

type UploaderRemoveFileProps = {
  id: string;
};

export function UploaderRemoveFile({ id }: UploaderRemoveFileProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  function handleClick() {
    dispatch(uploaderActions.removeFile(id));
  }

  return (
    <Button className={styles.removeFile} icon size="medium" color="error" onClick={handleClick}>
      <XMarkIcon title={t("uploader.file.remove")} />
    </Button>
  );
}
