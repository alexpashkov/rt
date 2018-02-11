const Game = require('./Game');

class Games {
  constructor() {
    this._games = [];
  }

  getGames() {
    return this._games;
  }

  addGame(game) {
    if (!(game instanceof Game)) {
      throw new TypeError('game must be an instance of Game');
    }
    this._games.push(game);
    return this; // for chaining
  }
}

module.exports = new Games();
