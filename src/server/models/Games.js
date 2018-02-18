const Game = require("./Game");

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
