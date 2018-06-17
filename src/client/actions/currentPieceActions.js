export const actionTypes = {
  SET_PIECE: 'CURRENT_PIECE_SET_PIECE'
};

export const setPiece = piece => ({
  type: actionTypes.SET_PIECE,
  payload: piece
});
