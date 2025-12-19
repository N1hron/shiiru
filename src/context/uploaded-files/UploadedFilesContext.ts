import { createContext, use, type RefObject } from "react";

export const UploadedFilesContext = createContext<RefObject<Map<string, File>> | null>(null);
export const useUploadedFilesContext = () => use(UploadedFilesContext)!;

