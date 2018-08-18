const GameMode = require('./GameMode');
const Player = require('./Player');
const BlockCodes = require('../../shared/block-codes');
const R = require('ramda');
const logger = require('../logger');

class DefaultGameMode extends GameMode {
  static getDefaultBoard(height = 20, width = 10) {
    return Array.from(Array(height))
      .fill(
        Array.from(Array(width)).fill(BlockCodes.BLOCK_FREE)
      )
  }
  constructor(game, playersControllers) {
    super(game);

    game.setPlayers(playersControllers.map((player) => new Player(player.id, {
      onCurrentPieceUpdate: this.onPlayerPieceUpdate.bind(this),
      onNextPieceUpdate: this.onPlayerNextPieceUpdate.bind(this),
      onBoardUpdate: this.onPlayerBoardUpdate.bind(this),
      onLineFilled: this.onPlayerLineFilled.bind(this),
      getNewPiece: this.getNewPiece.bind(this),
      onDisconnect: this.onPlayerDisconnect.bind(this),
      onPlayerLost: this.onPlayerLost.bind(this),
      onPlayerLeave: this.onPlayerLeave.bind(this),
    })));
  }

  update() {
    this.previousPieceUpdate = this.previousPieceUpdate || Date.now();
    logger.info(`Previous update -> ${this.previousPieceUpdate}`);

    const now = Date.now();

    if (now - this.previousPieceUpdate >= 1000) {
      /* Second has passed */
      this.previousPieceUpdate = this.previousPieceUpdate + 1000;
      for (let player of this.game.getPlayers().filter(_player => !_player.hasLost())) {
        player.movePiece({ x: 0, y: 1 });
      }
    }
  }

  beforeStart() {
    logger.info(`UpdateLoopInterval: ${typeof this.updateLoopInterval}`);
    this.generatePlayerBoards();
    this.generateInitialPieces();
  }

  afterFinish() {}

  generatePlayerBoards() {
    for (let player of this.game.getPlayers()) {
      player.setBoard(R.clone(DefaultGameMode.getDefaultBoard()));
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
    logger.error(`FREEZING LINES OF ${JSON.stringify(lineInfo)}`);
    this.game.getPlayers()
        .filter(player => player.id !== lineInfo.id)
        .forEach(player => player.freezeLine());
    this.game.onPlayerLineFilled(lineInfo);
  }

  onPlayerBoardUpdate(boardInfo) {
    this.game.onPlayerBoardUpdate(boardInfo);
  }

  onPlayerPieceUpdate(pieceInfo) {
    this.game.onPlayerPieceUpdate(pieceInfo);
  }

  onPlayerNextPieceUpdate(pieceInfo) {
    this.game.onPlayerNextPieceUpdate(pieceInfo);
  }

  onPlayerLost(playerInfo) {
    this.game.onPlayerLost(playerInfo);
  }

  onPlayerLeave(playerInfo) {
    this.game.onPlayerLeave(playerInfo);
  }

  onPlayerDisconnect(playerInfo) {
    this.game.onPlayerDisconnect(playerInfo);
  }
}

module.exports = DefaultGameMode;
