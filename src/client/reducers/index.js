import { combineReducers } from 'redux';

import userReducer from './userReducer';
import gamesListReducer from './gamesListReducer';
import currentGameInfoReducer from './currentGameInfoReducer';
import boardsReducer from './boardsReducer';
import pieceReducer from './pieceReducer';

export default combineReducers({
  user: userReducer,
  gamesList: gamesListReducer,
  currentGameInfo: currentGameInfoReducer,
  boards: boardsReducer,
  piece: pieceReducer,
});
