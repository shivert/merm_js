import { createStore, compose, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import { tokenSelector, setAuthHeader } from "./../middleware/api";
import { setAuthHeaderSearch } from "./../middleware/searchApi";

// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import { connectRouter, routerMiddleware } from "connected-react-router";
import rootReducer from "../reducers";
import { loadState, saveState } from "../localStorage";

export const history = createHistory();
const connectRouterHistory = connectRouter(history);

const persistedState = loadState();

function configureStoreProd() {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware
  ];

  const store = createStore(
    connectRouterHistory(rootReducer),
    persistedState,
    compose(applyMiddleware(...middlewares))
  );

  store.subscribe(() => {
    saveState({
      userObject: store.getState().userObject
    });
    const token = tokenSelector(store.getState());
    setAuthHeader(token);
    setAuthHeaderSearch(token);
  });

  return store;
}

function configureStoreDev() {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware
  ];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    connectRouterHistory(rootReducer),
    persistedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default; // eslint-disable-line global-require
      store.replaceReducer(connectRouterHistory(nextRootReducer));
    });
  }

  store.subscribe(() => {
    saveState({
      userObject: store.getState().userObject
    });
    const token = tokenSelector(store.getState());
    setAuthHeader(token);
    setAuthHeaderSearch(token);
  });

  return store;
}

const configureStore =
  process.env.NODE_ENV === "production"
    ? configureStoreProd
    : configureStoreDev;

export default configureStore;
