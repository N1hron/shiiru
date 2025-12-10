export function splitFileName(name: string) {
  const ext = name.match(/\.[^.]+$/)?.[0].slice(1);

  if (!ext) return [name, ""];
  return [name.slice(0, -(ext.length + 1)), ext];
}