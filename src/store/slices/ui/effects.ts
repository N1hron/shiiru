import { store } from "@/store";
import { actions } from "./slice";
import { matchIsMobile, matchPrefersLightTheme } from "./utils";

function listenToIsMobile() {
  matchIsMobile().addEventListener("change", (event) => {
    store.dispatch(actions.setIsMobile(event.matches));
  });
}

function listenToPreferredTheme() {
  matchPrefersLightTheme().addEventListener("change", (event) => {
    store.dispatch(actions.setPreferredTheme(event.matches ? "light" : "dark"));
  });
}

export const effects = {
  run() {
    listenToIsMobile();
    listenToPreferredTheme();
  }
};
