import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import notification from "./notification";
import userObject from "./userObject";
import detailedMermComments from "./detailedMermComments"
import merms from "./merms";
<<<<<<< HEAD
import detailedMermComments from "./detailedMermComments";
=======
import detailedMermComments from "./detailedMermComments"
>>>>>>> MERM-000:v1 of comments
import requestStatus from "./requestStatus";
import detailedMerm from "./detailedMerm";

const rootReducer = combineReducers({
  notification,
  userObject,
  requestStatus,
  detailedMermComments,
  detailedMerm,
  merms,
  detailedMermComments,
  router: connectRouter(history)
});

export default rootReducer;
