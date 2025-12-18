import { useCallback } from "react";

import { useFilesContext } from "@/context";
import { selectIsUploading, setIsUploading, uploadFile, useAppDispatch, useAppSelector } from "@/store";
import type { SerializedUploadError } from "@/store/slices/uploader/errors";

export function useUploadFiles() {
  const dispatch = useAppDispatch();
  const files = useFilesContext();
  const isUploading = useAppSelector(selectIsUploading);

  return useCallback(async (items: File | Iterable<File>): Promise<boolean> => {
    let isOk = false;

    if (!isUploading) {
      dispatch(setIsUploading(true));

      const itemsIterable = items instanceof File ? [items] : items;

      for (const file of itemsIterable) {
        const result = await dispatch(uploadFile(file));
        const hasError = result.meta.requestStatus === "rejected";

        if (hasError) {
          if ((result.payload as SerializedUploadError).type === "full") {
            break;
          }
          continue;
        }

        files.filesRef.current.set(result.payload as string, file);
        isOk = true;
      }

      dispatch(setIsUploading(false));
    }

    return isOk;

    // eslint-disable-next-line
  }, [isUploading]);
}