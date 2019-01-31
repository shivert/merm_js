import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import notification from "./notification";
import userObject from "./userObject";
import merms from "./merms";
import requestStatus from "./requestStatus";

const rootReducer = combineReducers({
  notification,
  userObject,
  requestStatus,
  merms,
  router: connectRouter(history)
});

export default rootReducer;
