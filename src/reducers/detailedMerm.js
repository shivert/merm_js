import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return {
    mermName: "Data Quality - Article",
    mermId: 0,
    source:"Chrome Extension",
    category: null,
    resourceUrl: "https://abc.com",
    resourceTitle: "Data Quality Best Practices",
    description: "Great article about data quality stuff",
    capturedText: "Blah Blah Blah Blah",
    tags: [
      {
        tagId: 123,
        name: "project 232"
      },
      {
        TagId: 124,
        name: "data quality"
      }
    ],
    owner: {
      userId: 1,
      name: "Spencer Hivert",
      avatar: ""
    },
    sharedWith: [
      {
        userId: 12,
        name: "",
        avatar: ""
      },
      {
        userId: 13,
        name: "Zach P",
        avatar: ""
      }
    ],
    lastViewed: "29/Jul/13 9:01 PM",
    created: "29/Jul/13 9:02 PM",
    updated: "29/Jul/13 9:03 PM",
    related: {
      mermId: 190,
      name: "Data quality best tools"
    }
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

export default function detailedMerm(state = initialState, action) {
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
