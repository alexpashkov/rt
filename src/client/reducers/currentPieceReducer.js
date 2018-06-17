import { actionTypes } from '../actions/currentPieceActions';

const INITIAL_STATE = {
  code: 0,
  x: 0,
  y: -4 // put it just out of the board
};

const currentPieceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_PIECE:
      return action.payload;
    default:
      return state;
  }
};

export default currentPieceReducer;
