import { actions } from "./slice";
import { selectors } from "./selectors";
import type { AppMiddleware } from "@/store";

const revokeUrls: AppMiddleware = (api) => (next) => (action) => {
  if (actions.removeFile.match(action)) {
    const state = api.getState();
    const file = selectors.selectFile(state, action.payload);

    if (file) {
      URL.revokeObjectURL(file.url);
    }
  }

  next(action);
};

export const middleware = {
  revokeUrls
};
