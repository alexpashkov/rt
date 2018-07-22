'use strict';

const logger = require('../logger');
const uniqid = require('uniqid');
const Game = require('../models/Game');
const { EventEmitter } = require('events');
const R = require('ramda');

/* GamesController Events */
const GCEvents = {
  GC_GAMES_UPDATED: 'GC_GAMES_UPDATED'
};

class GamesController {
  constructor() {
    this.games = [];
    setInterval(() => logger.debug(`Games: ${this.games.length}`), 2000);
  }

  createGame(id = null, players = [], configuration = {}) {
    const gameCreated = new Game(id || uniqid(), players, configuration);
    this.games[gameCreated.id] = gameCreated;
    gameCreated.setOnDestroyHandler(this.deleteGame.bind(this));
    return gameCreated.id;
  }

  getGameById(gameId) {
    return this.games[gameId];
  }

  deleteGame(gameId) {
    logger.info(`Destroying game ${gameId}`);
    if (this.games[gameId]) {
      delete this.games[gameId];
    }
  }
}

module.exports = new GamesController();
