import { combineReducers } from "redux";

import boardReducer from "./board";
import pieceReducer from "./piece";
import gameInfoReducer from "./game-info";
import gameChatMessages from "./game-chat-messages";

const gameReducer = combineReducers({
  board: boardReducer,
  piece: pieceReducer,
  info: gameInfoReducer,
  messages: gameChatMessages
});

export default gameReducer;
