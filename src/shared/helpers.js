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

module.exports = {
  pieceToArray: getPieceCells
}
