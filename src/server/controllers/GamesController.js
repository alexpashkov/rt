"use strict";

const logger = require("../logger");
const uniqid = require("uniqid");
const Game = require("../models/Game");
const { EventEmitter } = require("events");
const R = require("ramda");

/* GamesController Events */
const GCEvents = {
  GC_GAMES_UPDATED: "GC_GAMES_UPDATED"
};

class GamesController extends EventEmitter {

  constructor() {
    super();
    this.games = [];
    this.interval = setInterval(() => {
      const games = this.getGames();
      if (games.length) logger.debug(games);
    }, 3000);
  }

  createGame() {
    const gameCreated = new Game(uniqid());
    this.games[gameCreated.id] = gameCreated;

    gameCreated.on("destroy", this.deleteGame.bind(this));

    this.notifyGamesUpdated();

    return gameCreated.id;
  }

  joinGame(gameId, player) {
    if (this.games[gameId] && this.games[gameId].playerJoin(player)) {
      this.notifyGamesUpdated();
      return true;
    }
    return false;
  }

  leaveGame(gameId, playerId) {
    if (this.games[gameId] && this.games[gameId].playerLeave(playerId)) {
      this.notifyGamesUpdated();
      return true;
    }
    return false;
  }

  chatMessageSend(gameId, message) {
    if (this.games[gameId]) {
      this.games[gameId].chatMessageSend(message);
    }
  }

  gameExists(gameId) {
    return !!this.games[gameId];
  }

  getGameById(gameId) {
    return this.games[gameId];
  }

  getGames() {
    return R.values(this.games).map(game => game.getGameInfo());
  }

  deleteGame(gameId) {
    logger.info(`Destroying game ${gameId}`);
    if (this.games[gameId]) {
      delete this.games[gameId];
      this.notifyGamesUpdated();
    }
  }

  notifyGamesUpdated() {
    this.emit(GCEvents.GC_GAMES_UPDATED, this.getGames());
  }

  subscribePlayerOnGamesUpdate(callback) {
    this.on(GCEvents.GC_GAMES_UPDATED, callback);

    callback(this.getGames());
    logger.info(`Subscription on games update received. Listeners -> ${this.listenerCount(GCEvents.GC_GAMES_UPDATED)}`);
  }

  unsubscribePlayerOnGamesUpdate(callback) {
    this.removeListener(GCEvents.GC_GAMES_UPDATED, callback);
    logger.info(`Unsubscription on games update received. Listeners -> ${this.listenerCount(GCEvents.GC_GAMES_UPDATED)}`);
  }
}

module.exports = new GamesController();
