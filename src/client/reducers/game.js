import { combineReducers } from "redux";

import boardReducer from "./board";
import pieceReducer from "./piece";
import gameInfoReducer from "./game-info";

const gameReducer = combineReducers({
  board: boardReducer,
  piece: pieceReducer,
  info: gameInfoReducer
});

export default gameReducer;
