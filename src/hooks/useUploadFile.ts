import { useCallback } from "react";

import { uploadFile, useAppDispatch } from "@/store";
import { useUploadedFiles } from "./useUploadedFiles";
import type { UploadErrorType } from "@/types";

export function useUploadFile() {
  const dispatch = useAppDispatch();
  const { addFile } = useUploadedFiles();

  return useCallback(async (file: File): Promise<{
    isOk: true;
  } | {
    isOk: false;
    cause: UploadErrorType;
  }> => {
    const result = await dispatch(uploadFile(file));
    const isOk = result.meta.requestStatus === "fulfilled";

    if (isOk) {
      addFile(file, result.payload as string);
      return { isOk };
    }

    return { isOk, cause: result.payload as UploadErrorType };
  }, [dispatch, addFile]);
}