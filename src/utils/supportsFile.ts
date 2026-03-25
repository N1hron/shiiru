import { config } from "@/config";
import { getExtension } from "./getExtension";

const accept = new Set(config.upload.accept);
const reject = new Set(config.upload.reject);

export function supportsFile(file: File | DataTransferItem) {
  if (file instanceof DataTransferItem && file.kind !== "file") {
    return false;
  }

  const type = file.type;

  if (!type) {
    return false;
  }

  const wildcard = type.split("/")[0] + "/*";
  const ext = file instanceof File ? getExtension(file.name) : "";

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
