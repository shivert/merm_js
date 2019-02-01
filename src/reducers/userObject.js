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

const mapLogInResponse = value => ({
  id: value["signIn"]["id"],
  firstName: value["signIn"]["firstName"],
  lastName: value["signIn"]["lastName"],
  email: "",
  token: value["signIn"]["authenticationToken"]
});

const mapCreateUserResponse = value => ({
  id: 0,
  firstName: value["signUp"]["firstName"],
  lastName: value["signUp"]["lastName"],
  email: value["signUp"]["email"],
  token: value["signUp"]["authenticationToken"]
});

const initialState = getInitialState();

export default function userObject(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_USER_OBJECT_CREATE:
      return mapCreateUserResponse(action.value);
    case ActionTypes.UPDATE_USER_OBJECT_LOGIN:
      return mapLogInResponse(action.value);
    case ActionTypes.CLEAR_USER_OBJECT:
      return getInitialState();
    default:
      break;
  }

  return state;
}
