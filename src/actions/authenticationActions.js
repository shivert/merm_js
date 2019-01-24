import * as ActionTypes from "../constants/ActionTypes";
import * as API from "../middleware/api";
import { history } from "../store/configureStore";

export function userLogIn(fields) {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_REQUEST_INITIATED });

    API.userLogIn(fields).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_USER_OBJECT,
          value: response.data
        });
        dispatch({ type: ActionTypes.GET_REQUEST_SUCCESS });
        dispatch({ type: ActionTypes.RESET_REQUEST_STATUS });
        history.push("/dashboard");
      },
      error => {
        console.log("we got bit error");
        console.log(error);
      }
    );
  };
}

export function userLogOut() {
  console.log("we here");
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_USER_OBJECT });
    history.push("/login");
  };
}
