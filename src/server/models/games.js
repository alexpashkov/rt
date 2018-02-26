class GameError extends Error {}

class Game {
  constructor(id) {
    this.id = id;
    this.players = [];
    this.isRunning = false;
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

class Games {
  constructor() {
    this._games = [];
    this._lastId = 0;
  }

  createNew() {
    const game = new Game(++this._lastId);
    this._games.push(game);
    global.io.emit("GAMES_UPDATE", this.getAll());
    return game;
  }

  getAll() {
    return this._games;
  }
}

module.exports = new Games();
