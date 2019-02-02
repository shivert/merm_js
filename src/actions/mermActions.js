import * as ActionTypes from "../constants/ActionTypes";
import * as API from "../middleware/api";
import { history } from "../store/configureStore";

export function getMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.getMerms().then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_MERM_LIST,
          value: response.data
        });
        dispatch({ type: ActionTypes.REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
      },
      error => {
        if (error["response"].errors[0].message == "User not signed in") {
          dispatch({ type: ActionTypes.CLEAR_USER_OBJECT });
          history.push("/login");
          dispatch({
            type: ActionTypes.SHOW_NOTIFICATION,
            value: {
              show: true,
              type: "Error",
              message: "Not Signed It!",
              description:
                "Looks like you're token has expired, please sign in again!"
            }
          });
        } else {
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

export function favoriteMerm(mermId, favorite) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.favoriteMerm(mermId, favorite).then(
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

export function searchMerms(queryString) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.searchMerms(queryString).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_SEARCH_RESULTS_LIST,
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

export function clearSearchResults() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_SEARCH_RESULTS_LIST });
  };
}
