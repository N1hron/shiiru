import { throttle } from "./throttle";
import { debounce } from "./debounce";
import type { Fn, LimitedFn, LimitKind } from "@/types";

export function limit<C, A extends unknown[]>(fn: Fn<C, A, void>, kind: LimitKind, ms: number): LimitedFn<C, A> {
  if (kind === "throttle") {
    return throttle(fn, ms);
  } else {
    return debounce(fn, ms);
  }
}
