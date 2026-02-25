import { config } from "@/config";
import { getFileNameExt } from "./getFileNameExt";

const acceptSet = new Set(config.uploader.accept);
const rejectSet = new Set(config.uploader.reject);

export function supportsFileType(file: File | DataTransferItem) {
  if (file instanceof DataTransferItem && file.kind !== "file") {
    return false;
  }

  const type = file.type;

  if (!type) {
    return false;
  }

  const name = file instanceof File ? file.name : "";
  const wildcard = type.split("/")[0] + "/*";
  const ext = getFileNameExt(name, true);

  return (
    (
      acceptSet.has(type) ||
      acceptSet.has(wildcard) ||
      acceptSet.has(ext)
    ) && !(
      rejectSet.has(type) ||
      rejectSet.has(wildcard) ||
      rejectSet.has(ext)
    )
  );
}
