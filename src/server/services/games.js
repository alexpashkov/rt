const Game = require("../models/game");
const R = require("ramda");
const Promise = require("bluebird");
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
    return delete this._games[id]
      ? Promise.resolve(game)
      : Promise.reject({
          err: "Game not found",
          status: 404
        });
  }

  getAllGames() {
    return Promise.resolve(R.values(this._games).sort((a, b) => a.id - b.id));
  }
}

module.exports = new Games();
