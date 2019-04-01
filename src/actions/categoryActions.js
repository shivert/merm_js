import * as ActionTypes from "../constants/ActionTypes";
import * as API from "../middleware/api";
import * as searchAPI from "../middleware/searchApi";

export function getDashboardCategories() {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });
    searchAPI.getDashboardCategories().then(
      response => {
        dispatch({ type: ActionTypes.CATEGORIES_READY });
        dispatch({
          type: ActionTypes.UPDATE_DASHBOARD_CATEGORY_LIST,
          value: response.data
        });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
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

export function getCategories() {
  return dispatch => {
    API.getCategories().then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_CATEGORY_LIST,
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

export function clearCategories() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_CATEGORY_LIST });
  };
}

export function updateCategories(categories) {
  return dispatch => {
    dispatch({ type: ActionTypes.UPDATE_CATEGORY_STARTED });
    API.updateCategories(categories).then(
      () => {
        setTimeout(() => {
          dispatch({ type: ActionTypes.UPDATE_CATEGORY_FINISHED });
        }, 500);
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
