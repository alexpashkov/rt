class Player {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.gameId = null;
  }
}

module.exports = Player;