import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return [];
}

const initialState = getInitialState();

const mapResults = data =>
  data.results.map(searchResult => searchResult["_source"]);

export default function expired(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_EXPIRED_MERMS_LIST:
      return mapResults(action.value);
    case ActionTypes.CLEAR_EXPIRED_MERMS_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
