const assert = require("assert");
const blockCodes = require("./block-codes");

const transformToCoordinates = (movementDirection) => {
  if (typeof movementDirection === 'object')
    return movementDirection;

  switch (movementDirection) {
    case 'left':
      return { x: -1, y: 0 };
    case 'right':
      return { x: 1, y: 0 };
    case 'down':
      return { x: 0, y: 1 };
    case 'up':
      return { x: 0, y: -1 };
    default:
      return { x: 0, y: 0 };
  }
};

const transformToCoordsRelativeToPiece = (piece, coordinates) => {
  return (
    coordinates.absolute ?
      { 
        x: coordinates.x - piece.x,
        y: coordinates.y - piece.y
      } :
      coordinates
  );
};

const defaultPieceArray = [
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
];

const pieceCodeToArray = (pieceCode) =>
  defaultPieceArray.map((xArr, y) =>
    xArr.map((_, x) =>
      pieceCode & (1 << ((3 - x) + 4 * (3 - y)))));

/*
 *  board -> pieceCode[][]
 *  piece -> {
 *    pieceCode: number,
 *    x: number,
 *    y: number,
 *  }
 *  movementDirection -> string [ 'left', 'right', 'down', 'up' ]
 *                    -> object { x: number, y: number, absolute: bool }
 *
 */
module.exports = (board, piece, movementDirection) => {
  assert(board && piece && movementDirection);
  assert(board instanceof Array);
  assert((typeof movementDirection === 'string') || (typeof movementDirection === 'object'));

  const direction = transformToCoordsRelativeToPiece(
    piece,
    transformToCoordinates(movementDirection)
  );
  const pieceAsArray = pieceCodeToArray(piece.pieceCode);
  const boardHeight = board.length;
  const boardWidth = board[0].length;

  /*
   * TODO: Validate out-of-border cases.
   * TODO: Fix current code :(
   */

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (pieceAsArray[y][x] && board[piece.y + direction.y][piece.x + direction.x] != blockCodes.BLOCK_FREE)
        return false;
    }
  }
  return true;
};
