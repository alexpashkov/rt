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
  }

  createGame() {
    const gameCreated = new Game(uniqid());
    this.games[gameCreated.id] = gameCreated;
    gameCreated.on('destroy', this.deleteGame.bind(this));
    return gameCreated.id;
  }

  getGameById(gameId) {
    return this.games[gameId];
  }

  deleteGame(gameId) {
    logger.info(`Destroying game ${gameId}`);
    if (this.games[gameId]) {
      delete this.games[gameId];
      this.notifyGamesUpdated();
    }
  }
}

module.exports = new GamesController();
