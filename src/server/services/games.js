const Game = require("../models/Game");
const R = require("ramda");

let gameCounter = 0;
class Games {
  constructor() {
    this.games = {};
  }

  createNewGame() {
    const newGame = new Game(gameCounter++);
    this.games[newGame.id] = newGame;
    return newGame;
  }

  deleteGame(id) {
    const gameToDelete = this.games[id];
    if (!gameToDelete) return;
    delete this.games[id];
    return gameToDelete;
  }

  getAllGames() {
    return R.values(this.games);
  }

  getGame(id) {
    return this.games[id];
  }
}

module.exports = new Games();
