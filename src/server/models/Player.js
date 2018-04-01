class Player {
  constructor(id) {
    this.id = id;
    this.login = null;
  }

  setLogin(login) {
    if (typeof login === 'string') {
      this.login = login;
    }
  }
}

module.exports = Player;
