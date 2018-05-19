class Player {
  constructor(id, handlers) {
    this.id = id;
    this.pieceIndex = 0;
    this.handlers = handlers;
  }

  setBoard(board) {
    this.board = board;
  }

  getBoard() {
    return this.board;
  }

  initCurrentPiece() {
    this.piece = this.handlers.getNewPiece(this.pieceIndex);
    this.incrementPieceIndex();
    this.onCurrentPieceUpdate();
  }

  movePiece() {

  }

  setCurrentPiece(currentPiece) {
    this.currentPiece = currentPiece;
    this.onCurrentPieceUpdate();
  }

  getCurrentPiece() {
    return this.currentPiece;
  }

  getPieceIndex() {
    return this.pieceIndex;
  }

  onCurrentPieceUpdate() {
    this.handlers.onCurrentPieceUpdate && this.handlers.onCurrentPieceUpdate({
      id: this.id,
      piece: this.currentPiece
    });
  }

  onBoardUpdate() {
    this.handlers.onBoardUpdate && this.handlers.onBoardUpdate({
      id: this.id,
      board: this.board
    });
  }

  incrementPieceIndex() {
    this.pieceIndex++;
  }
}

module.exports = Player;
