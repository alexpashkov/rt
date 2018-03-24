class Player {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.gameId = null;
    this.refCount = 0;
  }

  acquire() {
    this.refCount++;
    return this;
  }

  free() {
    this.refCount--;
  }
}

module.exports = Player;
