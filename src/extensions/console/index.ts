import { dev } from "./dev";

Object.defineProperty(globalThis.console, "dev", {
  value: dev,
  writable: true,
  enumerable: true,
  configurable: true
});

export type Dev = typeof dev;
