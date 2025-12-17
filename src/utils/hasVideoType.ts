export function hasVideoType(file: File) {
  return file.type.startsWith("video/");
}