import { actions } from "./slice";
import { settings } from ".";
import type { AppDispatch, AppState } from "@/store/types";

export const resetItems = () => (dispatch: AppDispatch, getState: () => AppState) => {
  dispatch(actions.setItems(settings.selectDefaultItems(getState())));
};
