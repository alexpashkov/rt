const EventEmitter = require("events");
const logger = require("../logger");

class GameMode extends EventEmitter {
  constructor(game) {
    super();
    this.game = game;
  }

  start(params) {
    if (this.updateLoopInterval)
      return ;
    this.params = params;
    this.beforeStart();
    this.setUpdateLoop();
  }

  finish() {
    this.unsetUpdateLoop();
    this.afterFinish();
    this.game = null;
    this.params = null;
  }

  update() {
    throw "Interface method is not implemented."
  }

  beforeStart() {
    throw "Interface method is not implemented."
  }

  afterFinish() {
    throw "Interface method is not implemented."
  }

  setUpdateLoop() {
    logger.info('Setting loop interval');
    this.updateLoopInterval = setInterval(this.update.bind(this), 500);
    logger.info(`Loop Interval -> ${this.updateLoopInterval}`);
  }

  unsetUpdateLoop() {
    if (!this.updateLoopInterval)
      return ;
    clearInterval(this.updateLoopInterval);
    this.updateLoopInterval = null;
  }

};

module.exports = GameMode;
