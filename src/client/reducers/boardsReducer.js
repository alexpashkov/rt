import { actionTypes } from '../actions/boardsActions';

const boardsReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_BOARD:
      return {
        ...state,
        [action.payload.playerId]: action.payload.board
      };
    default:
      return state;
  }
};

export default boardsReducer;
