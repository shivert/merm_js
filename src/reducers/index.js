import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import fuelSavings from "./fuelSavingsReducer";
import userObject from "./userObject";
import requestStatus from "./requestStatus";

const rootReducer = combineReducers({
  fuelSavings,
  userObject,
  requestStatus,
  router: connectRouter(history)
});

export default rootReducer;
