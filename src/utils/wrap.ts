export function wrap(min: number, value: number, max: number) {
  const range = max - min + 1;
  return ((((value - min) % range) + range) % range) + min;
}
