import { useCallback } from "react";

import { downloadFile, useAppDispatch } from "@/store";
import { useUploadFiles } from "./useUploadFiles";

export function useDownloadFile() {
  const dispatch = useAppDispatch();
  const uploadFiles = useUploadFiles();

  return useCallback(() => {
    const promise = dispatch(downloadFile((file) => {
      void uploadFiles(file);
    }));

    return promise;
  }, [uploadFiles]);
}