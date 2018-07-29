export const SET_CURRENT_PIECE = 'PIECE_SET_CURRENT_PIECE';
export const SET_NEXT_PIECE = 'PIECE_SET_NEXT_PIECE';

export const setCurrentPiece = piece => ({
  type: SET_CURRENT_PIECE,
  payload: piece
});

export const setNextPiece = piece => ({
  type: SET_NEXT_PIECE,
  payload: piece
});
