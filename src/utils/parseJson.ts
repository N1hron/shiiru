export function parseJson(value: unknown, replacement: unknown = null): unknown {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return replacement;
    }
  }

  return replacement;
}
