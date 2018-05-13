const { memoizeWith, identity } = require('ramda');
const pieceCodes = require("../../shared/piece-codes.js");
const pieceRotationMap = require("../../shared/piece-rotation-map.js");

class PieceService {

  constructor() {
    this.pieceCodeToCells = memoizeWith(identity, this._pieceCodeToCells.bind(this));
  }

  rotatePiece(pieceCode) {
    return pieceRotationMap.get(pieceCode);
  }

  generateRandomPiece() {
    return pieceCodes[Math.floor(Math.random() * pieceCodes.length)];
  }

  _pieceCodeToCells(pieceCode) {
    return this._numToBinary16String(pieceCode)
      .split("")
      .reduce((acc, curr, i) => {
          curr === "1" ? [ ...acc, { x: i % 4, y: Math.floor(i / 4) }] : acc
        }, []);
  }
};

module.exports = new PieceService();
