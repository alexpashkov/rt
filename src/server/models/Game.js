const logger = require('../logger');
const { EventEmitter } = require('events');
const UserService = require('../services/UserService');
const PieceService = require('../services/PieceService');
const Player = require('./Player');
const DefaultGameMode = require('./DefaultGameMode');

/* Game Events */
const GEvents = {
  GE_CHAT_MESSAGE: 'GE_CHAT_MESSAGE',
  GE_INFO_UPDATE: 'GE_INFO_UPDATE',
  GE_STARTED: 'GE_STARTED',
  GE_START_FAILED: 'GE_START_FAILED',
  GE_PLAYER_PIECE_UPDATE: 'GE_PLAYER_PIECE_UPDATE',
  GE_PLAYER_BOARD_UPDATE: 'GE_PLAYER_BOARD_UPDATE'
};

class Game extends EventEmitter {
  constructor(id) {
    super();
    this.id = id;
    this.players = [];
    this.chatHistory = [];
    this.isRunning = false;
    this.gameMode = new DefaultGameMode(this);
    this.pieceQueue = [];
    this.gameParams = {};

    this.setDestroyTimeout();
  }

  hasStarted() {
    return this.isRunning;
  }

  hasEnded() {
    return !this.isRunning;
  }

  playerJoin(controllerInstance) {
    if (
      this.players.find(
        playerInList => playerInList.id === controllerInstance.id
      )
    )
      return false;

    if (this.destroyTimeout) this.cancelDestroyTimeout();

    const player = new Player(controllerInstance.id, {
      onCurrentPieceUpdate: this.onPlayerPieceUpdate.bind(this),
      onBoardUpdate: this.onPlayerBoardUpdate.bind(this),
      getNewPiece: this.getNewPiece.bind(this)
    });

    this.players.push(player);

    logger.debug(`Player ${JSON.stringify(player, null, '    ')} has joined.`);

    this.setEventHandlersForPlayer(controllerInstance);
    this.gameInfoUpdated();
    return true;
  }

  playerLeave(playerId) {
    if (this.players.filter(player => playerId === player.id).length === 0)
      return false;

    this.players = this.players.filter(player => player.id !== playerId);

    if (!this.players.length) this.setDestroyTimeout();

    this.gameInfoUpdated();
    return true;
  }

  playerIsLeaderById(playerId) {
    return this.players[0] && this.players[0].id === playerId;
  }

  chatMessageSend(message) {
    if (
      message.message &&
      message.login &&
      this.isPlayerInGameByLogin(message.login)
    ) {
      this.chatHistory.push(message);
      this.emit(GEvents.GE_CHAT_MESSAGE, message);
    }
  }

  gameStart(startInitiator) {
    logger.info(
      `${startInitiator} (leader? [${this.playerIsLeaderById(
        startInitiator
      )}]) has requested to start the game.`
    );
    if (!this.playerIsLeaderById(startInitiator))
      throw 'You are not a leader.';

    try {
      this.isRunning = true;
      this.gameMode.start(this.params);
      this.emit(GEvents.GE_STARTED);
    } catch (e) {
      this.isRunning = false;
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

  setEventHandlersForPlayer(player) {
    this.on(GEvents.GE_CHAT_MESSAGE, player.onChatMessageRecv.bind(player));
    this.on(GEvents.GE_INFO_UPDATE, player.onGameInfoUpdate.bind(player));
    this.on(GEvents.GE_STARTED, player.onGameStarted.bind(player));
    this.on(GEvents.GE_PLAYER_PIECE_UPDATE, player.onPieceUpdate.bind(player));
    this.on(GEvents.GE_PLAYER_BOARD_UPDATE, player.onBoardUpdate.bind(player));
  }

  getPlayers() {
    return this.players;
  }

  getPlayerById(playerId) {
    return this.players.find((player) => player.id == playerId);
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

  setDestroyTimeout() {
    this.destroyTimeout = setTimeout(this.destroySelf.bind(this), 5000);
  }

  cancelDestroyTimeout() {
    clearTimeout(this.destroyTimeout);
    this.destroyTimeout = null;
  }

  destroySelf() {
    logger.info(`Game ${this.id} emits destroy.`);
    this.emit('destroy', this.id);
  }
}

module.exports = Game;
