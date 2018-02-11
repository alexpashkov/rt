import { combineReducers } from "redux";

import boardReducer from "./board";
import pieceReducer from "./piece";

const gameReducer = combineReducers({
  board: boardReducer,
  piece: pieceReducer
});

export default gameReducer;
