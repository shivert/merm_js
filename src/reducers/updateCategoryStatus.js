import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return {
    loading: false
  };
}

const initialState = getInitialState();

export default function updateCategoryStatus(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ActionTypes.UPDATE_CATEGORY_STARTED:
      newState.loading = true;
      break;
    case ActionTypes.UPDATE_CATEGORY_FINISHED:
      newState.loading = false;
      break;
    default:
      break;
  }

  return newState;
}
