import { store } from "@/store/reducer";

import { thunks } from "./thunks";

function checkSupport() {
  void store.dispatch(thunks.checkSupport());
}

export const effects = {
  run() {
    checkSupport();
  }
};
