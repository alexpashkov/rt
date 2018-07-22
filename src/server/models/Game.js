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
      this.isRunning = false;
      this.gameMode.finish();
      debugger;
      this.emit(GEvents.GE_FINISHED);
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
    if (this.players.every(player => !player.canRespond()))
      this.gameFinish();
  }

  setEventHandlersForPlayer(player) {
    this.on(GEvents.GE_PLAYER_PIECE_UPDATE, player.onPieceUpdate.bind(player));
    this.on(GEvents.GE_PLAYER_BOARD_UPDATE, player.onBoardUpdate.bind(player));
    this.on(GEvents.GE_PLAYER_LINE_FILLED, player.onLineFilled.bind(player));
    this.on(GEvents.GE_PLAYER_DISCONNECTED, player.onPlayerHasDisconnected.bind(player));
    this.on(GEvents.GE_FINISHED, player.onGameFinished.bind(player));
    this.on(GEvents.GE_DESTROY, player.onGameDestroy.bind(player));
    this.on(GEvents.GE_PLAYER_HAS_LEFT, player.onPlayerHasLeft.bind(player));
    this.on(GEvents.GE_PLAYER_HAS_LOST, player.onPlayerHasLost.bind(player));
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
