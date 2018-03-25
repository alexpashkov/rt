"use strict";

const Game = require("../models/Game");
const R = require("ramda");
const io = require("socket.io");
const events = require("../events/types.js");

let gameCounter = 0;
class GamesService {
  constructor() {
    this.games = {};
    this.roomName = "gameServiceUpdates";
    this.interval = setInterval(this.backgroundWorker, 3000);
  }

  createGame(leaderId) {
    const newGame = new Game(gameCounter++);
    this.games[newGame.id] = newGame;
    return newGame.id;
  }

  deleteGame(id) {
    const gameToDelete = this.games[id];
    if (!gameToDelete) return;
    delete this.games[id];

    this.notifyGameUpdate(events.GAMES_UPDATED, this.getAllGames().map((game) => ({
      id: game.id,
    })));
  }

  getAllGames() {
    return R.values(this.games);
  }

  getGame(id) {
    return this.games[id];
  }

  subscribeSocketOnUpdates(socket) {
    socket.join(this.roomName);
  }

  unsubscribeSocketOnUpdates(socket) {
    socket.leave(this.roomName);
  }

  notifyGameUpdate(event, data) {
    io.to(this.roomName).emit(event, data);
  }

  backgroundWorker() {
    console.log(`Games now: ${R.values(this.games)}`);
  }
}

module.exports = new GamesService();
