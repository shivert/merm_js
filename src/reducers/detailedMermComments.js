import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return {
    mermId: 0,
    comments: [
      {
        authorId: "123",
        authorName: "Soencer Hivert",
        authorAvatar: "hsjdhgsj",
        message: "This is a comment",
        createdAt: "Jan 13, 3017"
      },
      {
        authorId: "123",
        authorName: "Colin Vander Glas",
        authorAvatar: "hsjdhgsj",
        message: "This is a comment",
        createdAt: "Jan 13, 3017"
      }
    ]
  };
}

const mapLogInResponse = value => ({
  id: 0,
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

export default function detailedMermComments(state = initialState, action) {
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
