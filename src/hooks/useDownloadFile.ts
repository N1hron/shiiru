import { useCallback } from "react";

import { useUploadedFiles } from "./useUploadedFiles";
import { downloadFile, useAppDispatch } from "@/store";

export function useDownloadFile() {
  const dispatch = useAppDispatch();
  const { addFile } = useUploadedFiles();

  return useCallback(() => {
    const promise = dispatch(downloadFile(addFile));
    const abort = () => promise.abort();

    return abort;
  }, [dispatch, addFile]);
}