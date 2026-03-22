export function wrap(min: number, value: number, max: number) {
  return ((((value - min) % (max - min + 1)) + (max - min + 1)) % (max - min + 1)) + min;
}
