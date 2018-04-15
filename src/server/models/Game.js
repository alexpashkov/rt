const logger = require("../logger");
const { EventEmitter } = require("events");
const playerService = require("../services/playerService.js");

/* Game Events */
const GEvents = {
  GE_CHAT_MESSAGE: "GE_CHAT_MESSAGE",
  GE_INFO_UPDATE: "GE_INFO_UPDATE",
  GE_GAME_STARTED: "GE_GAME_STARTED",
};

class Game extends EventEmitter {
  constructor(id) {
    super();
    this.id = id;
    this.players = [];
    this.isRunning = false;
    this.setDestroyTimeout();
  }

  playerJoin(player) {
    if (this.players.indexOf(player.id) !== -1) return false;

    if (this.destroyTimeout) this.cancelDestroyTimeout();

    this.players.push(player.id);

    this.setEventHandlersForPlayer(player);
    this.gameInfoUpdated();
    return true;
  }

  playerLeave(playerId) {
    if (this.players.indexOf(playerId) == -1) return false;

    this.players = this.players.filter(id => id !== playerId);

    if (!this.players.length) this.setDestroyTimeout();

    this.gameInfoUpdated();
    return true;
  }

  playerIsLeader(playerId) {
    return this.players.first() === playerId;
  }

  chatMessageSend(message) {
    if (message.message && message.login && this.isPlayerInGameByLogin(message.login)) {
      this.emit(GEvents.GE_CHAT_MESSAGE, message);
    }
  }

  gameStart(startInitiator) {
    if (!this.playerIsLeader(startInitiator))
      throw "You are not a leader.";

    this.isRunning = true;
    this.emit(GEvents.GE_GAME_STARTED);
  }

  setEventHandlersForPlayer(player) {
    this.on(GEvents.GE_CHAT_MESSAGE, player.onChatMessageRecv.bind(player));
    this.on(GEvents.GE_INFO_UPDATE, player.onGameInfoUpdate.bind(player));
    this.on(GEvents.GE_GAME_STARTED, player.onGameStarted.bind(player));
  }

  getGameInfo() {
    return {
      id: this.id,
      isRunning: this.isRunning,
      leaderId: this.players[0] || null,
      players: this.players.map((playerId) => {
        const player = playerService.getPlayerById(playerId);
        logger.info(`Player[${playerId}] found? -> ${player}`);
        return player ? { login: player.getLogin() } : null;
      }).filter((player) => (player !== null)),
    };
  }

  isPlayerInGameByLogin(login) {
    return (
      this.players
        .filter( playerId => {
          const player = playerService.getPlayerById(playerId);
          return player ? player.getLogin() === login : false;
        })
        .length !== 0);
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
