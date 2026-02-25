import { supportsFileType } from "@/utils/supportsFileType";

export function checkDataTransfer(dataTransfer: DataTransfer) {
  for (const item of dataTransfer.items) {
    if (supportsFileType(item)) {
      return true;
    }
  }
  return false;
}
