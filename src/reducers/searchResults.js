import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return [];
}

const initialState = getInitialState();

export default function searchResults(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_SEARCH_RESULTS_LIST:
      return action.value["searchMerm"];
    case ActionTypes.CLEAR_SEARCH_RESULTS_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
