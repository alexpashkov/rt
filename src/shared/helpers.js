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

const stringDirectionObject = {
  'right': { x: 1, y: 0 },
  'left': { x: -1, y: 0 },
  'down': { x: 0, y: 1 },
};
const stringToObjectDirection = str => stringDirectionObject[str] || { x: 0, y: 0 };

module.exports = {
  pieceToArray: getPieceCells,
  stringToObjectDirection: stringToObjectDirection,
}
