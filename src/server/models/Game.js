const logger = require("../logger");
const { EventEmitter } = require("events");
const PlayerService = require("../services/PlayerService.js");

class Game extends EventEmitter {
  constructor(id) {
    super();
    this.id = id;
    this.players = [];
    this.isRunning = false;
    this.setDestroyTimeout();
  }

  playerJoin(player) {
    if (this.destroyTimeout) this.clearDestroyTimeout();

    this.players.push(player.id);

    this.setEventHandlersForPlayer(player);
    return true;
  }

  playerLeave(playerId) {
    /* XXX: Handle event. */
    this.players = this.players.filter(id => id != playerId);

    if (!this.players.length) this.setDestroyTimeout();
  }

  setEventHandlersForPlayer(player) {
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
