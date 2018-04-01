"use strict";

const uniqid = require("uniqid");
const Player = require("../models/Player");

class PlayerService {
  constructor() {
    this.players = {};
  }

  createPlayer() {
    const newPlayer = new Player(uniqid());
    this.players[newPlayer.id] = newPlayer;
    return newPlayer.id;
  }

  getPlayerById(id) {
    return this.players[id];
  }

  notifyDisconnected(playerId) {
  }

  deletePlayer(id) {
    const playerToDelete = this.players[id];
    if (!playerToDelete) return;
    delete this.players[id];
  }

}

module.exports = new PlayerService();
