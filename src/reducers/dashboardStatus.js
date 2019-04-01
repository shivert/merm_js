import * as ActionTypes from "../constants/ActionTypes";

export const initialState = {
  categoriesReady: false,
  mermsReady: false
};

export default function dashboardStatus(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ActionTypes.CATEGORIES_READY:
      newState.categoriesReady = true;
      break;
    case ActionTypes.MERMS_READY:
      newState.mermsReady = true;
      break;
    case ActionTypes.RESET_DASHBOARD_STATUS:
      return { ...initialState };
    default:
      break;
  }

  return newState;
}
