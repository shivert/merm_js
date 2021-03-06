import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return [];
}

const initialState = getInitialState();

const mapResults = data => data.users;
const mapResultsAll = data => data.usersAll;

export default function users(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_USER_LIST:
      return mapResults(action.value);
    case ActionTypes.UPDATE_USER_ALL_LIST:
      return mapResultsAll(action.value);
    case ActionTypes.CLEAR_USER_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
