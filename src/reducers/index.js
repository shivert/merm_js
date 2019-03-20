import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import notification from "./notification";
import userObject from "./userObject";
import categories from "./categories";
import merms from "./merms";
import users from "./users";
import tags from "./tags";
import dashboardStatus from "./dashboardStatus";
import updateCategoryStatus from "./updateCategoryStatus";
import searchResults from "./searchResults";
import autocompleteResults from "./autocompleteResults";
import requestStatus from "./requestStatus";
import detailedMerm from "./detailedMerm";
import favourites from "./favourites";
import recent from "./recent";
import shared from "./shared";
import expired from "./expired";

const rootReducer = combineReducers({
  notification,
  userObject,
  requestStatus,
  detailedMerm,
  searchResults,
  categories,
  dashboardStatus,
  updateCategoryStatus,
  autocompleteResults,
  merms,
  users,
  tags,
  shared,
  favourites,
  recent,
  expired,
  router: connectRouter(history)
});

export default rootReducer;
