import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return [];
}

const initialState = getInitialState();

const mapResults = data =>
  data.results.map(searchResult => ({
    value: searchResult["_source"].name,
    text: searchResult["_source"].name,
    id: searchResult["_source"].id
  }));

export default function autocompleteResults(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_AUTOCOMPLETE_LIST:
      return mapResults(action.value);
    case ActionTypes.CLEAR_AUTOCOMPLETE_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
