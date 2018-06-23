const rotationMap = require('../../shared/piece-rotation-map');

class Player {
  constructor(id, handlers) {
    this.id = id;
    this.pieceIndex = 0;
    this.validator = () => true;
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

  movePiece(movementDirection) {
    if (!this.currentPiece)
      return false;

    /*
     *  XXX: Separate as helper.
     */
    if (typeof movementDirection === 'string') {
      movementDirection = (() => {
        if (movementDirection === 'down')
          return {x: 0, y: 1};
        else if (movementDirection === 'left')
          return {x: -1, y: 0};
        else if (movementDirection === 'right')
          return {x: 1, y: 0};
      })();
    }

    if (!validator(this.board, this.currentPiece, movementDirection))
      return false;

    this.currentPiece.x += movementDirection.x;
    this.currentPiece.y += movementDirection.y;

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
    if (!this.currentPiece) return false;

    /*
     *  XXX: Separate as helper.
     */
    if (typeof movementDirection === 'string') {
      movementDirection = (() => {
        if (movementDirection === 'down') return { x: 0, y: 1 };
        else if (movementDirection === 'left') return { x: -1, y: 0 };
        else if (movementDirection === 'right') return { x: 1, y: 0 };
      })();
    }

    if (!this.validator(this.board, this.currentPiece, movementDirection))
      return false;

    this.currentPiece.x += movementDirection.x;
    this.currentPiece.y += movementDirection.y;

    this.onCurrentPieceUpdate();
    return true;
  }

  rotatePiece(rotationDirection) {
    if (!this.currentPiece)
      return false;

    this.currentPiece.code = rotationMap.get(this.currentPiece.code);
    this.onCurrentPieceUpdate();
    return true;
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
