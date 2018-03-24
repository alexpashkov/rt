import { combineReducers } from "redux";

import boardReducer from "./board";
import pieceReducer from "./piece";
import gameMetaReducer from "./game-meta";

const gameReducer = combineReducers({
  board: boardReducer,
  piece: pieceReducer,
  meta: gameMetaReducer
});

export default gameReducer;
