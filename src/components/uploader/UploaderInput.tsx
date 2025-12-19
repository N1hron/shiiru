import { type ChangeEvent } from "react";

import { FileInput } from "@/ui";
import { selectIsUploaderDisabled, setIsUploading, useAppDispatch, useAppSelector } from "@/store";
import { useUploadFile } from "@/hooks";
import { devLog } from "@/utils";

export function UploaderInput() {
  const dispatch = useAppDispatch();
  const isDisabled = useAppSelector(selectIsUploaderDisabled);
  const uploadFile = useUploadFile();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!isDisabled && files) {
      uploadFiles(files).catch(devLog).finally(() => {
        event.target.value = "";
      });
    }
  }

  async function uploadFiles(files: FileList) {
    dispatch(setIsUploading(true));
    for (const file of files) {
      const result = await uploadFile(file).catch(devLog);

      if (result && !result.isOk && result.cause === "no-space") {
        break;
      }
    }
    dispatch(setIsUploading(false));
  }

  return (
    <FileInput
      size="medium"
      accept="image/*, video/*"
      disabled={isDisabled}
      title={isDisabled ? "File limit reached" : undefined}
      onChange={handleChange}
    >
      add files
    </FileInput>
  );
}