import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return {
    show: false,
    type: "",
    message: "",
    description: ""
  };
}

const initialState = getInitialState();

export default function notification(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_NOTIFICATION:
      return action.value;
    case ActionTypes.CLEAR_NOTIFICATION:
      return getInitialState();
    default:
      break;
  }

  return state;
}
