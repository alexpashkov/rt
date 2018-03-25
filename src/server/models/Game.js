const logger = require("../logger");
const PlayersService = require("../services/PlayersService.js");
class GameError extends Error {}

class Game {
  constructor(id, leaderId) {
    this.id = id;
    this.initSocketListeners();
    this.players = [leaderId];
    this.leaderId = leaderId;
    this.isRunning = false;
    this.config = {
      maxPlayers: 4,
      width: 10,
      height: 20
    }
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
    PlayersService.getPlayer(playerId).acquire();
    this.players.push(playerId);
  }

  findPlayer(id) {
    return //this.players.find(player => player.id === id);
  }

  gameRunning() {
    return this.isRunning;
  }

  notifyPlayerDisconnected(playerId) {
    if (!this.gameRunning()) {
      this.deletePlayer(playerId);
    }
  }

  deletePlayer(id) {
    const playerToRemove = this.findPlayer(id);
    if (!playerToRemove) {
      throw new GameError("There is no such player");
    }
    this.players = this.players.filter(player => player !== playerToRemove);
    player.gameId = null;
    player.free();
  }
}

module.exports = Game;
