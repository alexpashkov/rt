export const types = {
  SET_PIECE: 'CURRENT_PIECE_SET_PIECE'
};

export const setPiece = piece => ({
  type: types.SET_PIECE,
  payload: piece
});
