const logger = require("../logger");
class GameError extends Error {}

class Game {
  constructor(id, leaderId) {
    this.id = id;
    this.initSocketListeners();
    this.players = [leaderId];
    this.leaderId = leaderId;
    this.isRunning = false;
  }

  initSocketListeners() {
  }

  start() {
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }

  addPlayer(playerId) {
/*
    if (this.findPlayer(playerId)) {
      throw new GameError("Player is already in this game");
    }
*/
    this.players.push(playerId);
  }

  findPlayer(id) {
    return //this.players.find(player => player.id === id);
  }

  gameRunning() {
    return this.isRunning;
  }

  notifyPlayerDisconnected(playerId) {
    const playerToRemove = PlayersService.getPlayer(playerId);
    if (!this.gameRunning()) {
      playerToRemove.gameId = null;
    }
    PlayersService.notifyDisconnected(playerId);
  }

  removePlayer(id) {
    const playerToRemove = this.findPlayer(id);
    if (!playerToRemove) {
      throw new GameError("There is no such player");
    }
    this.players = this.players.filter(player => player !== playerToRemove);
    return playerToRemove;
  }
}

module.exports = Game;
