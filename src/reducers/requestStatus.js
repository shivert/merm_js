import * as ActionTypes from "../constants/ActionTypes";
import * as RequestStatusCodes from "../constants/RequestStatusCodes";

export const initialState = {
  loading: false,
  post: RequestStatusCodes.NOT_STARTED
};

export default function requestStatus(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ActionTypes.REQUEST_INITIATED:
      newState.post = RequestStatusCodes.INITIATED;
      newState.loading = true;
      break;
    case ActionTypes.REQUEST_SUCCESS:
      newState.post = RequestStatusCodes.SUCCESS;
      newState.loading = false;
      break;
    case ActionTypes.REQUEST_FAILURE:
      newState.post = RequestStatusCodes.FAILURE;
      newState.loading = false;
      break;
    case ActionTypes.RESET_REQUEST_STATUS:
      return { ...initialState };
    default:
      break;
  }

  return newState;
}
