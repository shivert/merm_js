import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import notification from "./notification";
import userObject from "./userObject";
import detailedMermComments from "./detailedMermComments"
import merms from "./merms";
import requestStatus from "./requestStatus";
import detailedMerm from "./detailedMerm";


const rootReducer = combineReducers({
  notification,
  userObject,
  requestStatus,
  detailedMermComments,
  detailedMerm,
  merms,
  router: connectRouter(history)
});

export default rootReducer;
