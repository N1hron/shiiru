export function dev(...data: unknown[]): void {
  if (import.meta.env.DEV) {
    console.log("[DEV]", ...data);
  }
}
