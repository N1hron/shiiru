const units = ["B", "KB", "MB", "GB", "TB"];

export function formatFileSize(size: number) {
  let currentUnit = units[0];
  let currentSize = size;

  for (const unit of units) {
    currentUnit = unit;
    if (currentSize < 1024) {
      break;
    }
    currentSize /= 1024;
  }

  return `${currentSize.toFixed(2)} ${currentUnit}`;
}