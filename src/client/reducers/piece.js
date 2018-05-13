import { types as pieceActionTypes } from "../actions/piece";
import rotationMap from "../../shared/piece-rotation-map";

const pieceReducer = (state = null, action) => {
  switch (action.type) {
    case pieceActionTypes.PIECE_SET:
      return action.payload;
    case pieceActionTypes.PIECE_CREATE:
      return {
        code: action.payload,
        x: 3,
        y: 4
      };
    case pieceActionTypes.PIECE_ROTATE:
      return {
        ...state,
        code: rotationMap.get(state.code)
      };
    case pieceActionTypes.PIECE_MOVE_RIGHT:
      return {
        ...state,
        x: state.x + 1
      };
    case pieceActionTypes.PIECE_MOVE_LEFT:
      return {
        ...state,
        x: state.x - 1
      };
    case pieceActionTypes.PIECE_MOVE_DOWN:
      return {
        ...state,
        y: state.y + 1
      };
    default:
      return state;
  }
};

export default pieceReducer;
