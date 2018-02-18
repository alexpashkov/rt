const uniqid = require("uniqid");

class Game {
  constructor() {
    this.id = uniqid();
    // this.started = false;
    // this.paused = false;
  }
}

module.exports = Game;
