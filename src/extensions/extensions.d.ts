import type { Dev } from "./console";

declare global {
  interface Console {
    dev: Dev;
  }
}

export {};
