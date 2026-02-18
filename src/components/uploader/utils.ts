import { config } from "@/config";

const acceptParts = new Set(config.uploader.accept.split(/,\s*/));

export function checkDataTransfer(dataTransfer: DataTransfer) {
  if (dataTransfer.items.length < 1) {
    return false;
  }

  for (const item of dataTransfer.items) {
    if (item.kind === "file" && item.type) {
      if (acceptParts.has(item.type)) {
        return true;
      }
      if (acceptParts.has(item.type.split("/")[0] + "/*")) {
        return true;
      }
    }
  }

  return false;
}
