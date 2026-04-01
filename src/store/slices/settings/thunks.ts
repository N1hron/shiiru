import { actions } from "./slice";
import { selectors } from "./selectors";
import type { AppDispatch, AppState } from "@/store";

const resetItems = () => (dispatch: AppDispatch, getState: () => AppState) => {
  const state = getState();
  const defaults = selectors.selectDefaultItems(state);

  dispatch(actions.setItems(defaults));
};

export const thunks = {
  resetItems
};
