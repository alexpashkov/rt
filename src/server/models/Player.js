class Player {
  constructor(id, socket) {
    this.id = id;
    this.login = null;
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

  setLogin(login) {
    if (typeof login === 'string') {
      this.login = login;
    }
  }
}

module.exports = Player;
