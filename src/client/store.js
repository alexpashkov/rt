import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggerMiddleware from 'redux-logger';

import mainReducer from './reducers';

export default createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(loggerMiddleware))
);
