export function devLog(...data: unknown[]) {
  if (import.meta.env.DEV) {
    console.log(...data);
  }
}