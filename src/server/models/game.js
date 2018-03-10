const logger = require("../logger");
class GameError extends Error {}

const nsp = Symbol("nsp");

class Game {
  constructor(id) {
    this.id = id;
    this[nsp] = global.io.of(id); // nsp property must be not enumerable
    // to be able to serialize object to JSON. Otherwise, its going to have
    // circular structure
    this.initSocketListeners();
    this.isRunning = false;
  }

  initSocketListeners() {
    this[nsp].on("connection", socket => {
      logger.debug("Socket has connected to a game");
      socket.on("disconnect", () => {
        logger.debug(`Socket ${socket.id} has disconnected from a game ${this.id}`);
      });
    });
  }

  start() {
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }

  addPlayer(player) {
    if (this.findPlayer(player.id)) {
      throw new GameError("Player is already in this game");
    }
    this.players.push(player);
  }

  findPlayer(id) {
    return this.players.find(player => player.id === id);
  }

  removePlayer(id) {
    const playerToRemove = this.findPlayer(id);
    if (!playerToRemove) {
      throw new GameError("There is no such player");
    }
    this.players = this.players.filter(player => player !== playerToRemove);
    return playerToRemove;
  }
}

module.exports = Game;
