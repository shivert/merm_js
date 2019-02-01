import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return {
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
    related: {},
    comments: []
  };
}

const mapFetchResponse = data => data.merm;

const mapEditResponse = data => data.editMerm;

const mapCommentResponse = (state, data) => {
  const updatedComments = {
    comments: state.comments.concat(data["addComment"])
  };
  return { ...state, ...updatedComments };
};

const initialState = getInitialState();

export default function detailedMerm(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_DETAILED_MERM:
      return mapFetchResponse(action.value);
    case ActionTypes.UPDATE_EDIT_DETAILED_MERM:
      return mapEditResponse(action.value);
    case ActionTypes.UPDATE_DETAILED_MERM_COMMENTS:
      return mapCommentResponse(state, action.value);
    case ActionTypes.CLEAR_DETAILED_MERM:
      return getInitialState();
    default:
      break;
  }

  return state;
}
