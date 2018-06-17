import { actionTypes } from '../actions/currentPieceActions';

const INITIAL_STATE = {
  code: 0,
  x: 0,
  y: -4
};

const currentPieceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_PIECE:
      return {
        code: action.payload,
        x: 0,
        y: 0
      };
    default:
      return state;
  }
};

export default currentPieceReducer;
