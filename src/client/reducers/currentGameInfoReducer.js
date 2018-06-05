import { actionTypes } from '../actions/currentGameInfoActions';

const currentGameInfoReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default currentGameInfoReducer;
