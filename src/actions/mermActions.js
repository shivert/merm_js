import * as ActionTypes from "../constants/ActionTypes";
import * as API from "../middleware/api";

export function getMerms(authToken) {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_REQUEST_INITIATED });

    API.getMerms(authToken).then(
      response => {
        dispatch({
          type: ActionTypes.UPDATE_MERM_LIST,
          value: response.data
        });
        dispatch({ type: ActionTypes.GET_REQUEST_SUCCESS });
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
