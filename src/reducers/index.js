import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import notification from "./notification";
import userObject from "./userObject";
import categories from "./categories";
import merms from "./merms";
import users from "./users";
import tags from "./tags";
import updateCategoryStatus from "./updateCategoryStatus";
import searchResults from "./searchResults";
import autocompleteResults from "./autocompleteResults";
import requestStatus from "./requestStatus";
import detailedMerm from "./detailedMerm";
import favourites from "./favourites";
import recent from "./recent";

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
  users,
  tags,
  favourites,
  recent,
  router: connectRouter(history)
});

export default rootReducer;
