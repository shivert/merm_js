import * as ActionTypes from "../constants/ActionTypes";

export function getInitialState() {
  return {
    name: "",
    id: 0,
    source: "",
    favorite: false,
    category: {},
    resourceUrl: "",
    resourceName: "",
    description: "",
    contentType: "chrome",
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

const mapFavResponse = (state, data) => {
  const updatedFav = {
    favorite: data["favoriteMerm"]["favorite"]
  };

  return { ...state, ...updatedFav };
};

const mapCommentResponse = (state, data) => {
  const updatedComments = {
    comments: state.comments.concat(data["addComment"])
  };
  return { ...state, ...updatedComments };
};

const mapTagResponse = (state, data) => {
  const updatedTags = {
    tags: state.tags.concat(data["addTag"])
  };
  return { ...state, ...updatedTags };
};

const mapSharingResponse = (state, data) => {
  const updatedSharing = {
    sharedWith: data["shareMerm"]["sharedWith"]
  };

  return { ...state, ...updatedSharing };
};

const mapRemoveTagResponse = (state, data) => {
  const removeTags = {
    tags: state.tags.filter(tag => tag.id !== data["deleteTag"]["id"])
  };
  return { ...state, ...removeTags };
};

const initialState = getInitialState();

export default function detailedMerm(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_DETAILED_MERM:
      return mapFetchResponse(action.value);
    case ActionTypes.UPDATE_EDIT_DETAILED_MERM:
      return mapEditResponse(action.value);
    case ActionTypes.UPDATE_DETAILED_MERM_SHARING:
      return mapSharingResponse(state, action.value);
    case ActionTypes.UPDATE_FAV_DETAILED_MERM:
      return mapFavResponse(state, action.value);
    case ActionTypes.UPDATE_DETAILED_MERM_COMMENTS:
      return mapCommentResponse(state, action.value);
    case ActionTypes.UPDATE_DETAILED_MERM_TAGS:
      return mapTagResponse(state, action.value);
    case ActionTypes.UPDATE_DETAILED_MERM_REMOVE_TAG:
      return mapRemoveTagResponse(state, action.value);
    case ActionTypes.CLEAR_DETAILED_MERM:
      return getInitialState();
    default:
      break;
  }

  return state;
}
