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

  getLogin() {
    return this.login ? this.login : this.id;
  }
}

module.exports = Player;
