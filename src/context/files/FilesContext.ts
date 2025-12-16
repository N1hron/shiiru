import { createContext, use, type RefObject } from "react";

export type Files = Record<string, File>;

export type FilesContextValue = {
  filesRef: RefObject<Files>;
};

export const FilesContext = createContext<FilesContextValue | null>(null);
export const useFilesContext = () => use(FilesContext)!;

