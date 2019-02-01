import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return {
    dashboardMerms: {
      suggested: [],
      favorites: [],
      unread: []
    }
  };
}

const initialState = getInitialState();

export default function merms(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_MERM_LIST:
      return action.value;
    case ActionTypes.CLEAR_MERM_LIST:
      return getInitialState();
    default:
      break;
  }

  return state;
}
