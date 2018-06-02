import { types } from "../actions/gamesList";

const gamesListReducer = (state = [], action) => {
    switch (action.type) {
        case types.GAMES_LIST_SET_LIST:
            return action.payload;
        default:
            return state;
    }
};

export default gamesListReducer;