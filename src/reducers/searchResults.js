import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return [];
}

const initialState = getInitialState();

const mapResults = data =>
  data.results.map(searchResult => searchResult["_source"]);

export default function searchResults(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_SEARCH_RESULTS_LIST:
      return mapResults(action.value);
    case ActionTypes.CLEAR_SEARCH_RESULTS_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
