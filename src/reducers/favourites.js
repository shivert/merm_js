import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return [];
}

const initialState = getInitialState();

const mapResults = data =>
  data.results.map(searchResult => searchResult["_source"]);

export default function favourites(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_FAV_MERMS_LIST:
      return mapResults(action.value);
    case ActionTypes.CLEAR_FAV_MERMS_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
