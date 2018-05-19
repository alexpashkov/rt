const GameMode = require("./GameMode");
const BlockCodes = require("../../shared/block-codes");
const PieceService = require("../services/PieceService");
const R = require("ramda");
const logger = require("../logger");

class DefaultGameMode extends GameMode {

  constructor(game) {
    super(game);
  }

  update() {
    this.previousPieceUpdate = this.previousPieceUpdate || Date.now();
    logger.info(`Previous update -> ${this.previousPieceUpdate}`);

    const now = Date.now();

    if (now - this.previousPieceUpdate === 1000) { /* Second passed */
      for (let player in this.game.getPlayers()) {
        player.movePiece({ y: 1 });
      }
    }
  }

  beforeStart() {
    logger.info(`UpdateLoopInterval: ${typeof this.updateLoopInterval}`);
    this.generatePlayerBoards();
    this.generateInitialPieces();
  }

  afterFinish() {

  }

  generatePlayerBoards() {
    const { boardWidth, boardHeight } = this.params || { boardWidth: 10, boardHeight: 20 };
    const defaultBoard = new Array(boardHeight);

    for (let y = 0; y < boardHeight; y++) {
      defaultBoard[y] = new Array(boardWidth);
      for (let x = 0; x < boardWidth; x++) {
        defaultBoard[y][x] = BlockCodes.BLOCK_FREE;
      }
    }

    for (let player of this.game.getPlayers()) {
      player.setBoard(R.clone(defaultBoard));
    }
  }

  generateInitialPieces() {
    for (let player of this.game.getPlayers()) {
      player.initCurrentPiece();
    }
  }

};

module.exports = DefaultGameMode;
