import { useTranslation } from "react-i18next";

import EyeIcon from "@/assets/icons/eye.svg?react";
import EyeClosedIcon from "@/assets/icons/eye-closed.svg?react";
import { Toggle } from "@/ui/toggle";
import { useAppDispatch, useAppSelector } from "@/store";
import { previewActions, previewSelectors } from "@/store/slices/preview";

import styles from "./style.module.scss";

type UploaderPreviewFileProps = {
  file: {
    id: string;
    name: string;
  };
};

export function UploaderPreviewFile({ file }: UploaderPreviewFileProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isPreviewTarget = useAppSelector((state) => previewSelectors.selectIsTargetId(state, file.id));
  const action = isPreviewTarget ? "hide" : "show";
  const title = t(`uploader.file.${action}Preview`);

  function setValue(value: boolean) {
    if (value) {
      dispatch(previewActions.setTargetId(file.id));
    } else {
      dispatch(previewActions.removeTargetId());
    }
  }

  return (
    <Toggle
      className={styles.previewFile}
      icon
      size="medium"
      color="accent"
      value={isPreviewTarget}
      aria-label={t("uploader.file.togglePreview", { name: file.name })}
      title={title}
      setValue={setValue}
    >
      { isPreviewTarget ? <EyeClosedIcon /> : <EyeIcon /> }
    </Toggle>
  );
}
