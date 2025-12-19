import { useRef, type ReactNode } from "react";

import { UploadedFilesContext } from "./UploadedFilesContext";

type UploadedFilesProviderProps = {
  children?: ReactNode;
};

const initialFiles = new Map<string, File>();

export function UploadedFilesProvider({ children }: UploadedFilesProviderProps) {
  const filesRef = useRef(initialFiles);

  return <UploadedFilesContext value={filesRef}>{children}</UploadedFilesContext>;
}