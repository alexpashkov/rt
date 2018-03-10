const R = require("ramda");
const Promise = require("bluebird");
const Game = require("../models/game");
const globalEventTypes = require("../global-events/event-types");

class Games {
  constructor() {
    this._games = {};
    this._lastId = 0;
  }

  createNewGame() {
    const game = new Game(++this._lastId);
    this._games[game.id] = game;
    this.getAllGames().then(games => {
      global.io.emit(globalEventTypes.GAMES_UPDATE, games);
    });
    return Promise.resolve(game);
  }

  deleteGame(id) {
    const game = this._games[id];
    delete this._games[id];
    return Promise.resolve(game);
  }

  getAllGames() {
    return Promise.resolve(R.values(this._games));
  }

  getGame(id) {
    return Promise.resolve(this._games[id]);
  }
}

module.exports = new Games();
