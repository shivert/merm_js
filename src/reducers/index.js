import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import notification from "./notification";
import userObject from "./userObject";
import requestStatus from "./requestStatus";
import detailedMerm from "./detailedMerm";


const rootReducer = combineReducers({
  notification,
  userObject,
  requestStatus,
  detailedMerm,
  router: connectRouter(history)
});

export default rootReducer;
