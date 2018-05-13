export const types = {
  PIECE_SET: "PIECE_SET",
  PIECE_CREATE: "PIECE_CREATE",
  PIECE_ROTATE: "PIECE_ROTATE",
  PIECE_MOVE_RIGHT: "PIECE_MOVE_RIGHT",
  PIECE_MOVE_LEFT: "PIECE_MOVE_LEFT",
  PIECE_MOVE_DOWN: "PIECE_MOVE_DOWN"
};

export const pieceSet = piece => ({
    type: types.PIECE_SET,
    payload: piece
});

export const pieceCreate = code => ({
  type: types.PIECE_CREATE,
  payload: code
});

export const pieceRotate = () => ({
  type: types.PIECE_ROTATE
});

export const pieceMoveRight = () => ({
  type: types.PIECE_MOVE_RIGHT
});

export const pieceMoveLeft = () => ({
  type: types.PIECE_MOVE_LEFT
});

export const pieceMoveDown = () => ({
  type: types.PIECE_MOVE_DOWN
});

