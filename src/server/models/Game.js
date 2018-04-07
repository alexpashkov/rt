const logger = require("../logger");
const { EventEmitter } = require("events");
const playerService = require("../services/PlayerService.js");

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
    return true;
  }

  playerLeave(playerId) {
    if (this.players.indexOf(playerId) == -1) return false;

    this.players = this.players.filter(id => id !== playerId);

    if (!this.players.length) this.setDestroyTimeout();

    return true;
  }

  setEventHandlersForPlayer(player) {
  }

  getGameInfo() {
    return {
      id: this.id,
      isRunning: this.isRunning,
      leaderId: this.players[0] || null,
      players: this.players.map((playerId) => {
        const player = playerService.getPlayerById(playerId);
        logger.info(`Player found? -> ${player}`);
        return player ? { login: player.getLogin() } : null;
      }).filter((player) => (player !== null)),
    };
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
