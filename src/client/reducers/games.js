import {types as gamesActionTypes} from '../actions/games';

const gamesReducer = (state = [], action) => {
  switch (action.type) {
    case gamesActionTypes.GAMES_SET:
      return action.payload;
    default:
      return state;
  }
};

export default gamesReducer;
