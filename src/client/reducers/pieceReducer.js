import { SET_CURRENT_PIECE, SET_NEXT_PIECE } from '../actions/pieceActions';

const currentPieceReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_PIECE:
      return {
        current: action.payload
      };
    case SET_NEXT_PIECE:
      return {
        next: action.payload
      };
    default:
      return state;
  }
};

export default currentPieceReducer;
