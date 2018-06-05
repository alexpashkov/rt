import { combineReducers } from 'redux';
import gamesListReducer from './gamesListReducer';
import currentGameInfoReducer from './currentGameInfoReducer';

export default combineReducers({
  currentGameInfo: currentGameInfoReducer,
  gamesList: gamesListReducer
});
