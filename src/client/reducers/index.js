import { combineReducers } from "redux";
import gamesReducer from "./games";
import gameReducer from "./game";

const rootReducer = combineReducers({
  games: gamesReducer,
  game: gameReducer
});

export default rootReducer;
