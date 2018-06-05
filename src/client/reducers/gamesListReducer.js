import { actionTypes } from '../actions/gamesListActions';

const gamesListReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default gamesListReducer;
