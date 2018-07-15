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
};

class Game extends EventEmitter {
  constructor(id, players, configuration) {
    super();

    assert(players[0]);

    this.id = id;
    this.leaderId = players[0].id;
    this.players = players.map((player) => new Player(player.id, {
      onCurrentPieceUpdate: this.onPlayerPieceUpdate.bind(this),
      onBoardUpdate: this.onPlayerBoardUpdate.bind(this),
      onLineFilled: this.onPlayerLineFilled.bind(this),
      getNewPiece: this.getNewPiece.bind(this),
    }));
    this.isRunning = false;
    this.gameMode = new DefaultGameMode(this);
    this.pieceQueue = [];
    this.gameParams = configuration;

    players.forEach(this.setEventHandlersForPlayer.bind(this));
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
      this.isRunning = false;
      this.gameMode.finish();
    } catch (e) {
      logger.error(`AN ERROR HAS OCCURED: ${e}`);
      throw e;
    }
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

  setEventHandlersForPlayer(player) {
    this.on(GEvents.GE_PLAYER_PIECE_UPDATE, player.onPieceUpdate.bind(player));
    this.on(GEvents.GE_PLAYER_BOARD_UPDATE, player.onBoardUpdate.bind(player));
    this.on(GEvents.GE_PLAYER_LINE_FILLED, player.onLineFilled.bind(player));
    this.on(GEvents.GE_FINISHED, player.onGameFinished.bind(player));
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

  isPlayerInGameByLogin(login) {
    return (
      this.players.filter(player => {
        const user = UserService.getUserById(player.id);
        return user ? user.getLogin() === login : false;
      }).length !== 0
    );
  }

  gameInfoUpdated() {
    this.emit(GEvents.GE_INFO_UPDATE, this.getGameInfo());
  }

  destroy() {
    this.emit('destroy');
  }

}

module.exports = Game;
