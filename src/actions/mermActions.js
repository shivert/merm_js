import * as ActionTypes from "../constants/ActionTypes";
import * as API from "../middleware/api";
import { history } from "../store/configureStore";

export function createMerm(mermDetails, successCallback, failureCallback) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });
    API.createMerm(mermDetails).then(
      response => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Success",
            message: `Merm created! ID: ${response.data.createMerm.id}`
          }
        });
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
        successCallback();
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable to Create Merm!",
            description: error["response"].errors[0].message
          }
        });
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
        failureCallback();
      }
    );
  };
}

export function clearMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_MERM_LIST });
  };
}

export function getMerm(mermId, shared = false) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.getMerm(mermId, shared).then(
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
            description: error["response"].errors[0].message
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
            description: error["response"].errors[0].message
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
            description: error["response"].errors[0].message
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
            description: error["response"].errors[0].message
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
            description: error["response"].errors[0].message
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
            description: error["response"].errors[0].message
          }
        });
      }
    );
  };
}

export function getUsers() {
  return dispatch => {
    API.getUsers().then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_USER_LIST,
          value: response.data
        });
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable fetch Categories",
            description: error["response"].errors[0].message
          }
        });
      }
    );
  };
}

export function getAllUsers() {
  return dispatch => {
    API.getAllUsers().then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_USER_ALL_LIST,
          value: response.data
        });
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable fetch Categories",
            description: error["response"].errors[0].message
          }
        });
      }
    );
  };
}

export function clearUsers() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_USER_LIST });
  };
}

export function getTags() {
  return dispatch => {
    API.getTags().then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_TAG_LIST,
          value: response.data
        });
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable fetch tags!",
            description: error["response"].errors[0].message
          }
        });
      }
    );
  };
}

export function clearTags() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_TAG_LIST });
  };
}

export function deleteMerm(mermId) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.deleteMerm(mermId).then(
      () => {
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
        history.push("/dashboard");
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable to delete Merm",
            description: error["response"].errors[0].message
          }
        });
      }
    );
  };
}

export function shareMerm(mermId, users) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.shareMerm(mermId, users).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_DETAILED_MERM_SHARING,
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
            message: "Unable to delete Merm",
            description: error["response"].errors[0].message
          }
        });
      }
    );
  };
}

export function copyMerm(mermId) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.copyMerm(mermId).then(
      response => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Success",
            message: `Merm copied! ID: ${response.data.copyMerm.id}`
          }
        });
        history.push(`/merm/${response.data.copyMerm.id}/overview`);
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable to copy Merm",
            description: error["response"].errors[0].message
          }
        });
      }
    );
  };
}

export function logAccess(mermId) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.logMermAccess(mermId).then(
      () => {
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
      },
      () => {
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
      }
    );
  };
}
