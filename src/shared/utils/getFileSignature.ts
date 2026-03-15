export function getFileSignature(file: File) {
  return file.name + file.type + file.size;
}
