import { useMemo } from "react";

import { useUploadedFilesContext } from "@/context";

export function useUploadedFiles() {
  const uploadedFiles = useUploadedFilesContext();

  return useMemo(() => ({
    addFile(file: File, id: string) {
      uploadedFiles.current.set(id, file);
    },
    removeFile(id: string) {
      uploadedFiles.current.delete(id);
    },
    getFile(id: string) {
      return uploadedFiles.current.get(id);
    },
  }), [uploadedFiles]);
}