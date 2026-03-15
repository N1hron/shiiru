export function capitalize(str: string, lowerRest = false): string {
  if (!str) return str;
  if (!lowerRest) return str.charAt(0).toUpperCase() + str.slice(1);
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
