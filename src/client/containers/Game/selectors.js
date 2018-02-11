import {createSelector} from 'reselect';
import {numToBinary16String} from '../../utils/index';

export const boardSelector = createSelector(
  state => state.game.board,
  state => state.game.piece,
  (board, piece) => {
    if (!piece) {
      return board;
    }
    const pieceCells = getPieceCells(piece.code);
    return board.map(
      (row, y) =>
        pieceCells.find(cell => cell.y + piece.y === y)
          ? row.map(
              (cell, x) =>
                !!pieceCells.find(
                  cell => cell.x + piece.x === x && cell.y + piece.y === y,
                ),
            )
          : row,
    );
  },
);

export const getPieceCells = pieceCode =>
  numToBinary16String(pieceCode)
    .split('')
    .reduce(
      (acc, curr, i) =>
        curr === '1'
          ? [
              ...acc,
              {
                x: i % 4,
                y: Math.floor(i / 4),
              },
            ]
          : acc,
      [],
    );
