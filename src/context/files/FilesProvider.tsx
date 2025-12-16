import { useMemo, useRef, type ReactNode } from "react";

import { FilesContext, type Files, type FilesContextValue } from "./FilesContext";

type FilesProviderProps = {
  children?: ReactNode;
};

export function FilesProvider({ children }: FilesProviderProps) {
  const filesRef = useRef<Files>({});
  const contextValue = useMemo<FilesContextValue>(() => ({ filesRef }), []);

  return <FilesContext value={contextValue}>{children}</FilesContext>;
}