export function satisfiesAccept<F extends { name: string; type: string }>(file: F, accept: string) {
  if (!accept) return true;

  const acceptParts = accept.split(",");
  const mime = file.type.split(";")[0].trim();

  for (const item of acceptParts) {
    const acceptPart = item.trim();

    if (acceptPart.startsWith(".") && file.name.endsWith(acceptPart)) {
      return true;
    }

    if (
      (mime === acceptPart) ||
      (acceptPart.endsWith("/*") && mime.startsWith(acceptPart.slice(0, -2)))
    ) {
      return true;
    }
  }

  return false;
}