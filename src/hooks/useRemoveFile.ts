import { useCallback } from "react";

import { removeUploaderItem, useAppDispatch } from "@/store";
import { useUploadedFiles } from "./useUploadedFiles";

export function useRemoveFile() {
  const dispatch = useAppDispatch();
  const { removeFile } = useUploadedFiles();

  return useCallback((id: string) => {
    dispatch(removeUploaderItem(id));
    removeFile(id);
  }, [dispatch, removeFile]);
}