import * as ActionTypes from "../constants/ActionTypes";
import * as API from "../middleware/api";

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
            description: "Something is broken!"
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
      response => {
        dispatch({ type: ActionTypes.UPDATE_CATEGORY_FINISHED });
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable fetch Categories",
            description: "Something is broken!"
          }
        });
      }
    );
  };
}
