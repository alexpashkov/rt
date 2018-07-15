import { createSelector } from 'reselect';
import { numToBinary16String } from '../../utils';
import { pickBy } from 'ramda';

export const mergeBoardAndPiece = (board, piece) => {
  if (!piece) return board;

  const pieceCells = getPieceCells(piece.code);
  return board.map(
    (row, y) =>
      pieceCells.find(cell => cell.y + piece.y === y)
        ? row.map(
            (cell, x) =>
              pieceCells.find(
                cell => cell.x + piece.x === x && cell.y + piece.y === y
              )
                ? piece.code
                : board[y][x]
          )
        : row
  );
};

export const getPieceCells = pieceCode =>
  numToBinary16String(pieceCode)
    .split('')
    .reduce(
      (acc, curr, i) =>
        +curr
          ? [
              ...acc,
              {
                x: i % 4,
                y: Math.floor(i / 4)
              }
            ]
          : acc,
      []
    );

export const userBoardSelector = createSelector(
  state => (state.boards && state.user && state.boards[state.user.id]) || [],
  state => state.currentPiece,
  mergeBoardAndPiece
);

export const spectresSelector = createSelector(
  state => state.boards || {},
  state => state.user && state.user.id,
  (boards, userId) =>
    boards && userId
      ? Object.keys(pickBy((_, id) => id != userId, boards))
          .reduce(
            (spectres, id) => [
              ...spectres,
              Object.assign({
                id,
                spectre: spectreFromBoard(boards[id])
              })
            ],
            []
          )
          .sort()
      : []
);

export const spectreFromBoard = board => {
  const spectre = Array.from(Array(20)).map(() => Array.from(Array(10)));
  for (let x = 0; x < 10; x++) {
    let filledFound = 0;
    for (let y = 0; y < 20; y++) {
      spectre[y][x] = (filledFound = filledFound || board[y][x]) ? 1 : 0;
    }
  }
  return spectre;
};
