export function toCapitalized(str: string) {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return str;
}