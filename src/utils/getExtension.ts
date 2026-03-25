export function getExtension(name: string, keepDot: boolean = false) {
  if (name) {
    const ext = name.match(/\.[^.]*$/)?.[0];
    if (ext) {
      if (keepDot) {
        return ext;
      }
      return ext.slice(1);
    }
  }
  return "";
}
