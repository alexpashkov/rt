class Games {
  constructor() {
    this._games = [];
  }

  getGames() {
    return this._games;
  }

  addGame(game) {
    this._games.push(game);
    return this; // for chaining
  }
}

module.exports = new Games();
