const { memoizeWith, identity } = require('ramda');
const pieceCodes = require("../../shared/piece-codes.js");
const pieceRotationMap = require("../../shared/piece-rotation-map.js");

class PieceService {

  constructor() {
  }

  rotatePiece(pieceCode) {
    return pieceRotationMap.get(pieceCode);
  }

  generateRandomPiece() {
    return pieceCodes[Math.floor(Math.random() * pieceCodes.length)];
  }

};

module.exports = new PieceService();
