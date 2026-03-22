import { store } from "@/store";
import { actions } from "./slice";
import { matchIsMobile, matchPrefersLightTheme } from "./utils";

export function listenToIsMobile() {
  matchIsMobile().addEventListener("change", (event) => {
    store.dispatch(actions.setIsMobile(event.matches));
  });
}

export function listenToPreferredTheme() {
  matchPrefersLightTheme().addEventListener("change", (event) => {
    store.dispatch(actions.setPreferredTheme(event.matches ? "light" : "dark"));
  });
}
