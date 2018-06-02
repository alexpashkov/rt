import { combineReducers } from "redux";
import gamesListReducer from "./gamesList";

export default combineReducers({
    gamesList: gamesListReducer
});
