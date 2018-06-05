import { combineReducers } from 'redux';

import userReducer from "./userReducer";
import gamesListReducer from './gamesListReducer';
import currentGameInfoReducer from './currentGameInfoReducer';

export default combineReducers({
  user: userReducer,
  currentGameInfo: currentGameInfoReducer,
  gamesList: gamesListReducer
});
