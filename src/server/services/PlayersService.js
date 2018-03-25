"use strict";

const uniqid = require("uniqid");
const Player = require("../models/Player");

class PlayersService {
  constructor() {
    this.players = {};
  }

  createPlayer(socket) {
    const newPlayer = new Player(uniqid(), socket);
    this.players[newPlayer.id] = newPlayer;
    return newPlayer;
  }

  getPlayer(id) {
    return this.players[id];
  }

  notifyDisconnected(playerId) {
    const playerToDelete = this.players[playerId];

    if (playerToDelete && !playerToDelete.gameId) {
      delete this.players[playerId];
    }
  }

  deletePlayer(id) {
    const playerToDelete = this.players[id];
    if (!playerToDelete) return;
    delete this.players[id];
    return playerToDelete;
  }

  playerExists(id) {
    return !!this.players[id];
  }
}

module.exports = new PlayersService();
