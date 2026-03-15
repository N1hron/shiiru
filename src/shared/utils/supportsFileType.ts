import { config } from "@/config";
import { getFileNameExt } from "./getFileNameExt";

const accept = new Set(config.uploader.accept);
const reject = new Set(config.uploader.reject);

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
      accept.has(type) ||
      accept.has(wildcard) ||
      accept.has(ext)
    ) && !(
      reject.has(type) ||
      reject.has(wildcard) ||
      reject.has(ext)
    )
  );
}
