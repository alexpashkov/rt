import { combineReducers } from 'redux';

import userReducer from './userReducer';
import gamesListReducer from './gamesListReducer';
import currentGameInfoReducer from './currentGameInfoReducer';
import currentPieceReducer from './currentGameInfoReducer';

export default combineReducers({
  user: userReducer,
  gamesList: gamesListReducer,
  currentGameInfo: currentGameInfoReducer,
  currentPiece: currentGameInfoReducer
});
