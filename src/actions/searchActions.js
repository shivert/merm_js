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

export function searchMerms(queryString) {
  return dispatch => {
    dispatch({ type: ActionTypes.REQUEST_INITIATED });

    API.search(queryString).then(
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
