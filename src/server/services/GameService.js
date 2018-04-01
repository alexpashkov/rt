"use strict";

const Game = require("../models/Game");
const R = require("ramda");

let gameCounter = 0;
class GameService {
  constructor() {
    this.games = {};
  }

  createGame(leaderId) {
    const newGame = new Game(gameCounter++);
    this.games[newGame.id] = newGame;

    newGame.on('destroy', this.deleteGame.bind(this));

    return newGame.id;
  }

  deleteGame(id) {
    logger.info(`Deleting game ${id}`);
    const gameToDelete = this.games[id];
    if (!gameToDelete) return;
    delete this.games[id];
  }

  getAllGames() {
    return R.values(this.games);
  }

  getGame(id) {
    return this.games[id];
  }

}

module.exports = new GameService();
