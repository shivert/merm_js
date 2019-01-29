import * as ActionTypes from "../constants/ActionTypes";
import * as API from "../middleware/api";
import { history } from "../store/configureStore";

export function userLogIn(fields) {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_REQUEST_INITIATED });

    API.userLogIn(fields).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_USER_OBJECT_LOGIN,
          value: response.data
        });
        dispatch({ type: ActionTypes.GET_REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
        history.push("/dashboard");
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable to Login",
            description: "Either your username or password is incorrect!"
          }
        });
      }
    );
  };
}

export function userLogOut() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_USER_OBJECT });
    history.push("/login");
  };
}

export function userCreate(fields) {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_REQUEST_INITIATED });

    API.userCreate(fields).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_USER_OBJECT_CREATE,
          value: response.data
        });
        dispatch({ type: ActionTypes.GET_REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
        history.push("/dashboard");
      },
      error => {
        dispatch({
          type: ActionTypes.SHOW_NOTIFICATION,
          value: {
            show: true,
            type: "Error",
            message: "Unable to create account",
            description: "Please check all the fields and try again!"
          }
        });
      }
    );
  };
}
