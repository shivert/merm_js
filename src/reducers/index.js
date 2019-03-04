import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import notification from "./notification";
import userObject from "./userObject";
import categories from "./categories";
import merms from "./merms";
import updateCategoryStatus from "./updateCategoryStatus";
import searchResults from "./searchResults";
import autocompleteResults from "./autocompleteResults";
import requestStatus from "./requestStatus";
import detailedMerm from "./detailedMerm";

const rootReducer = combineReducers({
  notification,
  userObject,
  requestStatus,
  detailedMerm,
  searchResults,
  categories,
  updateCategoryStatus,
  autocompleteResults,
  merms,
  router: connectRouter(history)
});

export default rootReducer;
