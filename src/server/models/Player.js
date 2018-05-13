class Player {
  constructor(id) {
    this.id = id;
    this.pieceIndex = 0;
  }

  setBoard(board) {
    this.board = board;
  }

  getBoard() {
    return this.board;
  }

  setCurrentPiece(currentPiece) {
    this.currentPiece = currentPiece;
  }

  getCurrentPiece() {
    return this.currentPiece;
  }

  getPieceIndex() {
    return this.pieceIndex;
  }

  incrementPieceIndex() {
    this.pieceIndex++;
  }
}

module.exports = Player;
