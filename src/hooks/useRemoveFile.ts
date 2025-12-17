import { useCallback } from "react";

import { useFilesContext } from "@/context";
import { removeUploaderItem, useAppDispatch } from "@/store";

export function useRemoveFile() {
  const dispatch = useAppDispatch();
  const files = useFilesContext();

  return useCallback((id: string) => {
    dispatch(removeUploaderItem(id));
    files.filesRef.current.delete(id);

    // eslint-disable-next-line
  }, []);
}