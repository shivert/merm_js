import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return [];
}

const initialState = getInitialState();

const mapResults = data =>
  data.tags;

export default function tags(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_TAG_LIST:
      return mapResults(action.value);
    case ActionTypes.CLEAR_TAG_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
