const blockCodes = require('./block-codes');
const padStart = require('lodash/padStart');

const numToString = (num, radix, length = num.length) => {
  const numString = num.toString(radix);
  return padStart(numString, length, '0');
};

const numToBinary16String = num => numToString(num, 2, 16);

const getPieceCells = pieceCode =>
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

const directionToObjectMap = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 }
};

const directionToObject = direction => {
  return typeof direction === 'object'
    ? direction
    : directionToObjectMap[direction];
};

module.exports = (board, piece, direction) => {
  const pieceCells = getPieceCells(piece.code);
  direction = directionToObject(direction);
  const nextPosition = { y: piece.y + direction.y, x: piece.x + direction.x };

  return pieceCells.every(({ x, y }) => {
    const newY = y + nextPosition.y;
    const newX = x + nextPosition.x;
    return (
      newY >= 0 &&
      newY < board.length &&
      newX >= 0 &&
      newX < board[0].length &&
      board[y + nextPosition.y][x + nextPosition.x] === blockCodes.BLOCK_FREE
    );
  });
};
