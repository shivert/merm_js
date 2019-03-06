import * as ActionTypes from "../constants/ActionTypes";
import * as API from "../middleware/api";
import { history } from "../store/configureStore";

export function createMerm(mermDetails, callback) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });
    API.createMerm(mermDetails).then(
      response => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Success",
            message: "Merm created!"
          }
        });
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
        callback();
      },
      () => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable to create Merms",
            description: "Something is broken!"
          }
        });
      }
    );
  };
}

export function clearMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_MERM_LIST });
  };
}

export function getMerm(mermId) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.getMerm(mermId).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_DETAILED_MERM,
          value: response.data
        });
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable fetch Merms",
            description: "Something is broken!"
          }
        });
      }
    );
  };
}

export function clearDetailedMerm() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_DETAILED_MERM });
  };
}

export function favoriteMerm(mermId, favorite) {
  return dispatch => {
    API.favoriteMerm(mermId, favorite).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_FAV_DETAILED_MERM,
          value: response.data
        });
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable fetch Merms",
            description: "Something is broken!"
          }
        });
      }
    );
  };
}

export function addMermComment(comment) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.addMermComment(comment).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_DETAILED_MERM_COMMENTS,
          value: response.data
        });
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable to add Merm Comment",
            description: "Something is broken!"
          }
        });
      }
    );
  };
}

export function removeTag(tagId) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.removeTag(tagId).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_DETAILED_MERM_REMOVE_TAG,
          value: response.data
        });
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable to delete Tag",
            description: "Something is broken!"
          }
        });
      }
    );
  };
}

export function addTag(tag) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.addTag(tag).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_DETAILED_MERM_TAGS,
          value: response.data
        });
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable to Add Tag",
            description: "Something is broken!"
          }
        });
      }
    );
  };
}

export function editMerm(mermId, fields) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.editMerm(mermId, fields).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_EDIT_DETAILED_MERM,
          value: response.data
        });
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable update Merm",
            description: "Something is broken!"
          }
        });
      }
    );
  };
}
