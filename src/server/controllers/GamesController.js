"use strict";

const logger = require("../logger");
const uniqid = require("uniqid");
const Game = require("../models/Game");
const R = require("ramda");

class GamesController {

  constructor() {
    this.games = [];
    this.interval = setInterval(() => {
      const games = this.getGames();
      if (games.length) logger.debug(this.getGames());
    }, 3000);
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

  leaveGame(gameId, playerId) {
    return this.games[gameId] ?
      this.games[gameId].playerLeave(playerId) :
      false;
  }

  getGameById(gameId) {
    return this.games[gameId];
  }

  getGames() {
    return R.values(this.games).map( game => ({ gameId: game.id, isRunning: game.isRunning }) );
  }

  deleteGame(gameId) {
    logger.info(`Destroying game ${gameId}`);
    if (this.games[gameId]) delete this.games[gameId];
  }
}

module.exports = new GamesController();
