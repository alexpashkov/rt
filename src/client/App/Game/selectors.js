import { numToBinary16String } from '../../utils';

export const mergeBoardAndPiece = (board, piece) => {
  if (!piece) return board;

  const pieceCells = getPieceCells(piece.code);
  return board.map(
    (row, y) =>
      pieceCells.find(cell => cell.y + piece.y === y)
        ? row.map(
            (cell, x) =>
              !!pieceCells.find(
                cell => cell.x + piece.x === x && cell.y + piece.y === y
              )
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
