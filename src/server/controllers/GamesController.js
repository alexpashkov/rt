"use strict";

const logger = require("../logger");
const uniqid = require("uniqid");
const Game = require("../models/Game");

class GamesController {

  constructor() {
    this.games = [];
  }

  createGame() {
    const gameCreated = new Game(uniqid());
    this.games[gameCreated.id] = gameCreated;

    gameCreated.on('destroy', this.deleteGame.bind(this));

    return gameCreated.id;
  }

  joinGame(gameId, player) {
    return this.games[gameId] ?
      this.games[gameId].playerJoin(player) :
      false;
  }

  getGameById(gameId) {
    return this.games[gameId];
  }

  deleteGame(gameId) {
    logger.info(`Destroying game ${gameId}`);
    if (this.games[gameId]) delete this.games[gameId];
  }
}

module.exports = new GamesController();
