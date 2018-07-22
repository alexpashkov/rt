const GameMode = require('./GameMode');
const Player = require('./Player');
const BlockCodes = require('../../shared/block-codes');
const R = require('ramda');
const logger = require('../logger');

class DefaultGameMode extends GameMode {
  constructor(game, playersControllers) {
    super(game);

    game.setPlayers(playersControllers.map((player) => new Player(player.id, {
      onCurrentPieceUpdate: this.onPlayerPieceUpdate.bind(this),
      onBoardUpdate: this.onPlayerBoardUpdate.bind(this),
      onLineFilled: this.onPlayerLineFilled.bind(this),
      getNewPiece: this.getNewPiece.bind(this),
      onDisconnect: this.onPlayerDisconnect.bind(this),
      onPlayerLost: this.onPlayerLost.bind(this),
    })));
  }

  update() {
    this.previousPieceUpdate = this.previousPieceUpdate || Date.now();
    logger.info(`Previous update -> ${this.previousPieceUpdate}`);

    const now = Date.now();

    if (now - this.previousPieceUpdate >= 1000) {
      /* Second passed */
      this.previousPieceUpdate = this.previousPieceUpdate + 1000;
      for (let player of this.game.getPlayers().filter(_player => !_player.hasLost())) {
        player.movePiece({ x: 0, y: 1 });
      }
    }

    if (this.isGameFinished()) {
      this.game.gameFinish();
    }
  }

  beforeStart() {
    logger.info(`UpdateLoopInterval: ${typeof this.updateLoopInterval}`);
    this.generatePlayerBoards();
    this.generateInitialPieces();
  }

  afterFinish() {}

  isGameFinished() {
    return this.game.getPlayers().every(player => player.hasLost());
  }

  generatePlayerBoards() {
    const { boardWidth, boardHeight } = this.params || {
      boardWidth: 10,
      boardHeight: 20
    };
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

  getNewPiece(index) {
    return this.game.getNewPiece(index);
  }

  generateInitialPieces() {
    for (let player of this.game.getPlayers()) {
      player.initCurrentPiece();
    }
  }

  onPlayerLineFilled(lineInfo) {
    this.game.onPlayerLineFilled(lineInfo);
  }

  onPlayerBoardUpdate(boardInfo) {
    this.game.onPlayerBoardUpdate(boardInfo);
  }

  onPlayerPieceUpdate(pieceInfo) {
    this.game.onPlayerPieceUpdate(pieceInfo);
  }

  onPlayerLost(playerInfo) {
    this.game.onPlayerLost(playerInfo);
  }

  onPlayerDisconnect(playerInfo) {
    this.game.onPlayerDisconnect(playerInfo);
  }
}

module.exports = DefaultGameMode;
