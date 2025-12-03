export function splitFileName(name: string) {
  const ext = name.match(/\.[^.]+$/)?.[0];

  if (!ext) {
    return [name, ""];
  }

  return [name.slice(0, -ext.length), ext.slice(1)];
}