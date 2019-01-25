import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    token: ""
  };
}

const mapResponse = value => ({
  id: 0,
  firstName: value["signIn"]["first_name"],
  lastName: value["signIn"]["last_name"],
  email: "",
  token: value["signIn"]["authenticationToken"]
});

const initialState = getInitialState();

export default function userObject(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_USER_OBJECT:
      return mapResponse(action.value);
    case ActionTypes.CLEAR_USER_OBJECT:
      return getInitialState();
    default:
      break;
  }

  return state;
}
