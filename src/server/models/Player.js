const rotationMap = require('../../shared/piece-rotation-map');
const validator = require('../../shared/validator');
const helpers = require('../../shared/helpers');

class Player {
  constructor(id, handlers) {
    this.id = id;
    this.pieceIndex = 0;
    this.validator = validator || (() => true);
    /*
     *  This 'handlers' thing is just a test.
     *  I thought there are too much event emitters and it makes
     *  code bad :(
     *
     * This things seems to work ok.
     */
    this.handlers = handlers;
  }

  setBoard(board) {
    this.board = board;
    this.onBoardUpdate();
  }

  getBoard() {
    return this.board;
  }

  initCurrentPiece() {
    this.currentPiece = {
      code: this.handlers.getNewPiece(this.pieceIndex),
      x: 0,
      y: 0
    };
    this.incrementPieceIndex();
    this.onCurrentPieceUpdate();
  }

  setCurrentPiece(currentPiece) {
    this.currentPiece = currentPiece;
    this.onCurrentPieceUpdate();
  }

  getCurrentPiece() {
    return this.currentPiece;
  }

  movePiece(movementDirection) {
    if (!this.currentPiece)
      return false;

    if (typeof movementDirection === 'string') {
      movementDirection = helpers.stringToObjectDirection(movementDirection);
    }

    if (!this.validator(this.board, this.currentPiece, movementDirection))
    {
      /* 
       * There is the case where piece collides with the bottom of the map
       * and has to freeze. This has to be checked, even though the movement is invalid. 
       */
      if (movementDirection.x === 0 && movementDirection.y > 0) {
        this.applyPieceToBoard();
        this.checkIsLineFilled();
        this.setCurrentPiece(this.getNewCurrentPiece());
      }
      return false;
    }

    this.currentPiece.x += movementDirection.x;
    this.currentPiece.y += movementDirection.y;

    this.onCurrentPieceUpdate();
    return true;
  }

  rotatePiece() {
    if (!this.currentPiece)
      return false;

    const rotatedPiece = Object.assign({}, this.currentPiece, { code: rotationMap.get(this.currentPiece.code) });

    if (!this.validator(this.board, rotatedPiece, { x: 0, y: 0 }))
      return false;

    this.currentPiece.code = rotationMap.get(this.currentPiece.code);
    this.onCurrentPieceUpdate();
    return true;
  }

  applyPieceToBoard() {
    const pieceArray = helpers.pieceToArray(this.currentPiece.code);

    for (let block of pieceArray) {
      this.board[this.currentPiece.y + block.y][this.currentPiece.x + block.x] = this.currentPiece.code;
    }

    this.onBoardUpdate();
  }

  checkIsLineFilled() {
  }

  getNewCurrentPiece() {
    return {
      code: this.handlers.getNewPiece(this.pieceIndex++),
      x: Math.floor(Math.random() * Math.floor(this.board[0].length - 4)),
      y: 0
    }
  }

  setValidator(validator) {
    this.validator = validator;
  }

  getPieceIndex() {
    return this.pieceIndex;
  }

  onCurrentPieceUpdate() {
    this.handlers.onCurrentPieceUpdate &&
      this.handlers.onCurrentPieceUpdate({
        id: this.id,
        piece: this.currentPiece
      });
  }

  onBoardUpdate() {
    this.handlers.onBoardUpdate &&
      this.handlers.onBoardUpdate({
        id: this.id,
        board: this.board
      });
  }

  incrementPieceIndex() {
    this.pieceIndex++;
  }
}

module.exports = Player;
