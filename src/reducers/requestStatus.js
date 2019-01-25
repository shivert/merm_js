import * as ActionTypes from "../constants/ActionTypes";
import * as RequestStatusCodes from "../constants/RequestStatusCodes";

export const initialState = {
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
      break;
    case ActionTypes.GET_REQUEST_SUCCESS:
      newState.get = RequestStatusCodes.SUCCESS;
      break;
    case ActionTypes.GET_REQUEST_FAILURE:
      newState.get = RequestStatusCodes.FAILURE;
      break;
    case ActionTypes.POST_REQUEST_INITIATED:
      newState.post = RequestStatusCodes.INITIATED;
      break;
    case ActionTypes.POST_REQUEST_SUCCESS:
      newState.post = RequestStatusCodes.SUCCESS;
      break;
    case ActionTypes.POST_REQUEST_FAILURE:
      newState.post = RequestStatusCodes.FAILURE;
      break;
    case ActionTypes.PUT_REQUEST_INITIATED:
      newState.put = RequestStatusCodes.INITIATED;
      break;
    case ActionTypes.PUT_REQUEST_SUCCESS:
      newState.put = RequestStatusCodes.SUCCESS;
      break;
    case ActionTypes.PUT_REQUEST_FAILURE:
      newState.put = RequestStatusCodes.FAILURE;
      break;
    case ActionTypes.DELETE_REQUEST_INITIATED:
      newState.del = RequestStatusCodes.INITIATED;
      break;
    case ActionTypes.DELETE_REQUEST_SUCCESS:
      newState.del = RequestStatusCodes.SUCCESS;
      break;
    case ActionTypes.DELETE_REQUEST_FAILURE:
      newState.del = RequestStatusCodes.FAILURE;
      break;
    case ActionTypes.RESET_REQUEST_STATUS:
      return { ...initialState };
    default:
      break;
  }

  return newState;
}
