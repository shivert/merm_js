import * as ActionTypes from "../constants/ActionTypes";
import * as API from "../middleware/searchApi";
import { history } from "../store/configureStore";

export function autoComplete(query) {
  return dispatch => {
    API.autoComplete(query).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_AUTOCOMPLETE_LIST,
          value: response.data
        });
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
                "Looks like your token has expired, please sign in again!"
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

export function getDashboardMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.loadDashboard().then(
      response => {
        dispatch({ type: ActionTypes.MERMS_READY });
        dispatch({
          type: ActionTypes.UPDATE_MERM_LIST,
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

export function clearDashboardMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_MERM_LIST });
  };
}

export function clearDashboardStatus() {
  return dispatch => {
    dispatch({ type: ActionTypes.RESET_DASHBOARD_STATUS });
  };
}

export function searchMerms(queryParams) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.search(queryParams).then(
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
            description: error["response"].errors[0].message
          }
        });
      }
    );
  };
}

export function advancedSearchMerms(queryFields) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.advancedSearch(queryFields).then(
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
            description: error["response"].errors[0].message
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

export function getFavMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.getFavMerms().then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_FAV_MERMS_LIST,
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

export function clearFavMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_FAV_MERMS_LIST });
  };
}

export function getRecentMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.getRecentMerms().then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_REC_MERMS_LIST,
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

export function clearRecentMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_REC_MERMS_LIST });
  };
}

export function getSharedMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.getSharedMerms().then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_SHARED_MERMS_LIST,
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

export function clearSharedMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_SHARED_MERMS_LIST });
  };
}

export function getExpiredMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.getExpiredMerms().then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_EXPIRED_MERMS_LIST,
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
            message: "Unable to fetch Expired Merms",
            description: error["response"].errors[0].message
          }
        });
      }
    );
  };
}

export function clearExpiredMerms() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_EXPIRED_MERMS_LIST });
  };
}
