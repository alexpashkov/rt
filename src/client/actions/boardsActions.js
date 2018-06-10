export const actionTypes = {
  SET_BOARD: 'BOARDS_SET_BOARD'
};

export const setBoard = (playerId, board) => ({
  type: actionTypes.SET_BOARD,
  payload: {
    playerId,
    board
  }
});
