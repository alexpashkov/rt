const logger = require('../logger');
const assert = require('assert');
const { EventEmitter } = require('events');
const UserService = require('../services/UserService');
const PieceService = require('../services/PieceService');
const Player = require('./Player');
const DefaultGameMode = require('./DefaultGameMode');

/* Game Events */
const GEvents = {
  GE_INFO_UPDATE: 'GE_INFO_UPDATE',
  GE_STARTED: 'GE_STARTED',
  GE_START_FAILED: 'GE_START_FAILED',
  GE_PLAYER_PIECE_UPDATE: 'GE_PLAYER_PIECE_UPDATE',
  GE_PLAYER_NEXT_PIECE_UPDATE: 'GE_PLAYER_NEXT_PIECE_UPDATE',
  GE_PLAYER_BOARD_UPDATE: 'GE_PLAYER_BOARD_UPDATE',
  GE_PLAYER_LINE_FILLED: 'GE_PLAYER_LINE_FILLED',
  GE_PLAYER_DISCONNECTED: 'GE_PLAYER_DISCONNECTED',
  GE_PLAYER_HAS_LEFT: 'GE_PLAYER_HAS_LEFT',
  GE_PLAYER_HAS_LOST: 'GE_PLAYER_HAS_LOST',
  GE_FINISHED: 'GE_FINISHED',
  GE_DESTROY: 'GE_DESTROY',
};

class Game extends EventEmitter {
  constructor(id, playersControllers, configuration) {
    super();

    assert(playersControllers[0]);

    this.id = id;
    this.leaderId = playersControllers[0].id;
    this.isRunning = false;
    this.gameMode = new DefaultGameMode(this, playersControllers);
    if (typeof(this.players) === 'undefined') {
      this.setDefaultPlayers(playersControllers);
    }
    this.pieceQueue = [];
    this.gameParams = configuration;
    this._playersControllers = playersControllers;

    /* These are MainController instances */
    playersControllers.forEach(this.setEventHandlersForPlayer.bind(this));
  }

  hasStarted() {
    return this.isRunning;
  }

  hasEnded() {
    return !this.isRunning;
  }

  playerIsLeaderById(playerId) {
    return this.players[0] && this.players[0].id === playerId;
  }

  gameStart() {
    try {
      this.isRunning = true;
      this.gameMode.start(this.params);
    } catch (e) {
      this.isRunning = false;
      throw e;
    }
  }

  gameFinish() {
    try {
      logger.error(`GAME IS FINISHING ${this.id}`);

      /* I'm sorry for this piece */
      const winner = this.players.filter(player => !(player.hasLost() || player.hasLeft()));
      const winnerId = winner.length ? winner[0].id : this.players[0].id;

      this.isRunning = false;
      this.gameMode.finish();
      this.emit(GEvents.GE_FINISHED, {winnerId: winnerId});
      this._playersControllers.map(controller =>
        this.unsetEventHandlersForPlayer(controller));
      this.destroy();
      /*
       * XXX:
       *  Players should release reference to the game.
       *  MainControllers should forget about gameId.
       */
    } catch (e) {
      logger.error(`AN ERROR HAS OCCURED: ${e}`);
      throw e;
    }
  }

  playerLeave(playerId) {
    if (!this.getPlayers().find(player => player.id === playerId))
      return false;

    const playerController = this._playersControllers.find(p => p.id === playerId);
    if (playerController) {
      this.unsetEventHandlersForPlayer(playerController);
      this._playersControllers = this._playersControllers.filter(
        p => p.id !== playerController.id);
    }

    this.getPlayerById(playerId).leave();
  }

  /*
   *  Because all players have to receive the same pieces in the same order,
   *  unified pieceQueue and getNewPiece method are required.
   */
  getNewPiece(index) {
    if (this.pieceQueue.length <= index)
      this.pieceQueue.push(PieceService.generateRandomPiece());
    return this.pieceQueue[index];
  }

  onPlayerPieceUpdate(pieceInfo) {
    this.emit(GEvents.GE_PLAYER_PIECE_UPDATE, {
      ...pieceInfo
    });
  }

  onPlayerNextPieceUpdate(pieceInfo) {
    this.emit(GEvents.GE_PLAYER_NEXT_PIECE_UPDATE, {
      ...pieceInfo
    });
  }

  onPlayerBoardUpdate(boardInfo) {
    logger.info(`BOARD UPDATED -> ${JSON.stringify(boardInfo)}`);
    this.emit(GEvents.GE_PLAYER_BOARD_UPDATE, {
      ...boardInfo
    });
  }

  onPlayerLineFilled(lineInfo) {
    logger.info(`Line has been filled -> ${JSON.stringify(lineInfo)}`);
    this.emit(GEvents.GE_PLAYER_LINE_FILLED, lineInfo);
  }

  onPlayerLost(playerInfo) {
    this.emit(GEvents.GE_PLAYER_HAS_LOST, playerInfo);
    this.checkIfFinished();
  }

  onPlayerDisconnect(playerInfo) {
    this.emit(GEvents.GE_PLAYER_DISCONNECTED, playerInfo);
    this.checkIfFinished();
  }

  onPlayerLeave(playerInfo) {
    this.emit(GEvents.GE_PLAYER_HAS_LEFT, playerInfo);
    this.checkIfFinished();
  }

  checkIfFinished() {
    if (!this.isSingleMode() &&
        this.players.filter(player => player.canRespond()).length <= 1)
      this.gameFinish();
    else if (this.players.every(player => !player.canRespond()))
      this.gameFinish();
  }

  isSingleMode() {
    return this.players.length === 1;
  }

  setEventHandlersForPlayer(player) {
    player._gameHandlers = {
      onPieceUpdate: player.onPieceUpdate.bind(player),
      onNextPieceUpdate: player.onNextPieceUpdate.bind(player),
      onBoardUpdate: player.onBoardUpdate.bind(player),
      onLineFilled: player.onLineFilled.bind(player),
      onPlayerHasDisconnected: player.onPlayerHasDisconnected.bind(player),
      onGameFinished: player.onGameFinished.bind(player),
      onGameDestroy: player.onGameDestroy.bind(player),
      onPlayerHasLeft: player.onPlayerHasLeft.bind(player),
      onPlayerHasLost: player.onPlayerHasLost.bind(player),
    };

    this.on(GEvents.GE_PLAYER_PIECE_UPDATE, player._gameHandlers.onPieceUpdate);
    this.on(GEvents.GE_PLAYER_NEXT_PIECE_UPDATE, player._gameHandlers.onNextPieceUpdate);
    this.on(GEvents.GE_PLAYER_BOARD_UPDATE, player._gameHandlers.onBoardUpdate);
    this.on(GEvents.GE_PLAYER_LINE_FILLED, player._gameHandlers.onLineFilled);
    this.on(GEvents.GE_PLAYER_DISCONNECTED, player._gameHandlers.onPlayerHasDisconnected);
    this.on(GEvents.GE_FINISHED, player._gameHandlers.onGameFinished);
    this.on(GEvents.GE_DESTROY, player._gameHandlers.onGameDestroy);
    this.on(GEvents.GE_PLAYER_HAS_LEFT, player._gameHandlers.onPlayerHasLeft);
    this.on(GEvents.GE_PLAYER_HAS_LOST, player._gameHandlers.onPlayerHasLost);
  }

  unsetEventHandlersForPlayer(player) {
    logger.debug(`Unsetting handlers for player [${player.id}]`);
    this.removeListener(GEvents.GE_PLAYER_PIECE_UPDATE, player._gameHandlers.onPieceUpdate);
    this.removeListener(GEvents.GE_PLAYER_NEXT_PIECE_UPDATE, player._gameHandlers.onNextPieceUpdate);
    this.removeListener(GEvents.GE_PLAYER_BOARD_UPDATE, player._gameHandlers.onBoardUpdate);
    this.removeListener(GEvents.GE_PLAYER_LINE_FILLED, player._gameHandlers.onLineFilled);
    this.removeListener(GEvents.GE_PLAYER_DISCONNECTED, player._gameHandlers.onPlayerHasDisconnected);
    this.removeListener(GEvents.GE_FINISHED, player._gameHandlers.onGameFinished);
    this.removeListener(GEvents.GE_DESTROY, player._gameHandlers.onGameDestroy);
    this.removeListener(GEvents.GE_PLAYER_HAS_LEFT, player._gameHandlers.onPlayerHasLeft);
    this.removeListener(GEvents.GE_PLAYER_HAS_LOST, player._gameHandlers.onPlayerHasLost);
    player._gameHandlers = undefined;
  }

  getPlayers() {
    return this.players;
  }

  getPlayerById(playerId) {
    return this.players.find((player) => player.id === playerId);
  }

  getGameInfo() {
    return {
      id: this.id,
      isRunning: this.isRunning,
      leaderId: this.players[0] && this.players[0].id,
      players: this.players
        .map(player => {
          const user = UserService.getUserById(player.id);
          logger.info(`User[${player.id}] found? -> ${!!user}`);
          return user ? { login: user.getLogin() } : null;
        })
        .filter(userLogin => userLogin !== null),
      chatHistory: this.chatHistory
    };
  }

  gameInfoUpdated() {
    this.emit(GEvents.GE_INFO_UPDATE, this.getGameInfo());
  }

  setPlayers(players) {
    this.players = players;
  }

  setDefaultPlayers(playersControllers) {
    this.players = playersControllers.map((player) => new Player(player.id, {
      onCurrentPieceUpdate: this.onPlayerPieceUpdate.bind(this),
      onNextPieceUpdate: this.onPlayerNextPieceUpdate.bind(this),
      onBoardUpdate: this.onPlayerBoardUpdate.bind(this),
      onLineFilled: this.onPlayerLineFilled.bind(this),
      getNewPiece: this.getNewPiece.bind(this),
      onDisconnect: this.onPlayerDisconnect.bind(this),
      onPlayerLeave: this.onPlayerLeave.bind(this),
      onPlayerLost: this.onPlayerLost.bind(this),
    }));
  }

  setOnDestroyHandler(handler) {
    this.on(GEvents.GE_DESTROY, handler);
  }

  destroy() {
    this.players = null;
    this.gameMode = null;
    this.gameParams = null;
    this.pieceQueue = null;
    this.emit(GEvents.GE_DESTROY, this.id);
  }

}

module.exports = Game;
