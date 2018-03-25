const PlayersService = require("../services/PlayersService.js");

class Player {
  constructor(id, socket) {
    this.id = id;
    this.login = null;
    this.socket = socket;
    this.gameId = null;
    this.refCount = 1;
  }

  acquire() {
    this.refCount++;
    return this;
  }

  free() {
    this.refCount--;
    if (!this.refCount) {
      PlayersService.deletePlayer(this.id);
    }
    if (this.refCount < 0) {
      console.warn("Bug. Player ref count is lesser than 0 -> " + this.refCount);
    }
  }

  setLogin(login) {
    if (typeof login === 'string') {
      this.login = login;
    }
  }

  getGameId() {
    return this.gameId;
  }

  inGame() {
    return !!this.gameId;
  }
}

module.exports = Player;
