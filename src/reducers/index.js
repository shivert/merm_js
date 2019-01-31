import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import notification from "./notification";
import userObject from "./userObject";
import detailedMermComments from "./detailedMermComments"
import requestStatus from "./requestStatus";

const rootReducer = combineReducers({
  notification,
  userObject,
  requestStatus,
  detailedMermComments,
  router: connectRouter(history)
});

export default rootReducer;
