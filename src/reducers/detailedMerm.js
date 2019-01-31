import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return {
    merm: {
      mermName: "",
      mermId: 0,
      source: "",
      favorite: false,
      category: null,
      resourceUrl: "",
      resourceName: "",
      description: "",
      capturedText: "",
      tags: [],
      owner: {},
      sharedWith: [],
      lastAccessed: "",
      createdAt: "",
      updatedAt: "",
      related: {}
    }
  };
}

const mapResponse = data => ({
  merm: data.editMerm
});

const initialState = getInitialState();

export default function detailedMerm(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_DETAILED_MERM:
      return action.value;
    case ActionTypes.UPDATE_EDIT_DETAILED_MERM:
      return mapResponse(action.value);
    case ActionTypes.CLEAR_DETAILED_MERM:
      return getInitialState();
    default:
      break;
  }

  return state;
}
