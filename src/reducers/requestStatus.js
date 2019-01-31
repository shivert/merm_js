import * as ActionTypes from "../constants/ActionTypes";
import * as RequestStatusCodes from "../constants/RequestStatusCodes";

export const initialState = {
  loading: false,
  get: RequestStatusCodes.NOT_STARTED,
  post: RequestStatusCodes.NOT_STARTED,
  put: RequestStatusCodes.NOT_STARTED,
  del: RequestStatusCodes.NOT_STARTED
};

export default function requestStatus(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ActionTypes.GET_REQUEST_INITIATED:
      newState.get = RequestStatusCodes.INITIATED;
      newState.loading = true;
      break;
    case ActionTypes.GET_REQUEST_SUCCESS:
      newState.get = RequestStatusCodes.SUCCESS;
      newState.loading = false;
      break;
    case ActionTypes.GET_REQUEST_FAILURE:
      newState.get = RequestStatusCodes.FAILURE;
      newState.loading = false;
      break;
    case ActionTypes.POST_REQUEST_INITIATED:
      newState.post = RequestStatusCodes.INITIATED;
      newState.loading = true;
      break;
    case ActionTypes.POST_REQUEST_SUCCESS:
      newState.post = RequestStatusCodes.SUCCESS;
      newState.loading = false;
      break;
    case ActionTypes.POST_REQUEST_FAILURE:
      newState.post = RequestStatusCodes.FAILURE;
      newState.loading = false;
      break;
    case ActionTypes.PUT_REQUEST_INITIATED:
      newState.put = RequestStatusCodes.INITIATED;
      newState.loading = true;
      break;
    case ActionTypes.PUT_REQUEST_SUCCESS:
      newState.put = RequestStatusCodes.SUCCESS;
      newState.loading = false;
      break;
    case ActionTypes.PUT_REQUEST_FAILURE:
      newState.put = RequestStatusCodes.FAILURE;
      newState.loading = false;
      break;
    case ActionTypes.DELETE_REQUEST_INITIATED:
      newState.del = RequestStatusCodes.INITIATED;
      newState.loading = true;
      break;
    case ActionTypes.DELETE_REQUEST_SUCCESS:
      newState.del = RequestStatusCodes.SUCCESS;
      newState.loading = false;
      break;
    case ActionTypes.DELETE_REQUEST_FAILURE:
      newState.del = RequestStatusCodes.FAILURE;
      newState.loading = false;
      break;
    case ActionTypes.RESET_REQUEST_STATUS:
      return { ...initialState };
    default:
      break;
  }

  return newState;
}
