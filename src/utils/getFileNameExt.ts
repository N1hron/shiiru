export function getFileNameExt(name: string) {
  return name && (name.match(/\.[^.]*$/)?.[0] || "").slice(1);
}
