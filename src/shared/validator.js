const blockCodes = require('./block-codes');
const helpers = require('./helpers');

const getPieceCells = helpers.pieceToArray;

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
  if (!direction) {
    return false;
  }

  const nextPosition = { y: piece.y + direction.y, x: piece.x + direction.x };

  return pieceCells.every(({ x, y }) => {
    const newY = y + nextPosition.y;
    const newX = x + nextPosition.x;
    return (
      newY >= -4 &&
      newY < board.length &&
      newX >= 0 &&
      newX < board[0].length &&
      (newY < 0 || board[y + nextPosition.y][x + nextPosition.x] === blockCodes.BLOCK_FREE)
    );
  });
};
