import { createStore, applyMiddleware, compose } from "redux";
import loggerMiddleware from "redux-logger";
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from "./reducers";
import rootEpic from "./epic";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(loggerMiddleware, createEpicMiddleware(rootEpic)))
);
