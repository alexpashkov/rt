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
    /* ... */
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
    defaultBoard.forEach((line, yIndex) => {
      defaultBoard[yIndex] = new Array(boardWidth);
      defaultBoard[yIndex].forEach((element, xIndex) => {
        defaultBoard[yIndex][xIndex] = BlockCodes.BLOCK_FREE;
      });
    });

    this.game.getPlayers().forEach((player) => {
      player.setBoard(R.clone(defaultBoard));
    });
  }

  generateInitialPieces() {
    this.game.pieceQueue.push(PieceService.generateRandomPiece());
    this.game.getPlayers().forEach((player) => {
      this.game.setPlayerPiece(player);
    });
  }
};

module.exports = DefaultGameMode;
