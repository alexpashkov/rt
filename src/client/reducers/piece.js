import { types as pieceActionTypes } from "../actions/piece";

const pieceReducer = (state = null, action) => {
  switch (action.type) {
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

const rotationMap = new Map([
  [0x0f00, 0x2222],
  [0x2222, 0x00f0],
  [0x00f0, 0x4444],
  [0x4444, 0x0f00],
  [0x44c0, 0x8e00],
  [0x8e00, 0x6440],
  [0x6440, 0x0e20],
  [0x0e20, 0x44c0],
  [0x4460, 0x0e80],
  [0x0e80, 0xc440],
  [0xc440, 0x2e00],
  [0x2e00, 0x4460],
  [0x0660, 0x0660],
  [0x06c0, 0x8c40],
  [0x8c40, 0x6c00],
  [0x6c00, 0x4620],
  [0x4620, 0x06c0],
  [0x0e40, 0x4c40],
  [0x4c40, 0x4e00],
  [0x4e00, 0x4640],
  [0x4640, 0x0e40],
  [0x0c60, 0x4c80],
  [0x4c80, 0xc600],
  [0xc600, 0x2640],
  [0x2640, 0x0c60]
]);

export default pieceReducer;
