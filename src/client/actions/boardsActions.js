export const actionTypes = {
  SET_BOARD: 'BOARDS_SET_BOARD',
  CLEAR_BOARDS: 'CLEAR_BOARDS'
};

export const setBoard = (playerId, board) => ({
  type: actionTypes.SET_BOARD,
  payload: {
    playerId,
    board
  }
});

export const clearBoards = () => ({
  type: actionTypes.CLEAR_BOARDS
});
