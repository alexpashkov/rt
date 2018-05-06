const logger = require("../logger");
const { EventEmitter } = require("events");
const UserService = require("../services/UserService.js");
const Player = require("./Player");

/* Game Events */
const GEvents = {
  GE_CHAT_MESSAGE: "GE_CHAT_MESSAGE",
  GE_INFO_UPDATE: "GE_INFO_UPDATE",
  GE_GAME_STARTED: "GE_GAME_STARTED",
};

class Game extends EventEmitter {
  constructor(id) {
    super();
    this.id = id;
    this.players = [];
    this.isRunning = false;
    this.gameMode = this.gameModeStub(this);
    this.pieceQueue = [];

    this.setDestroyTimeout();
  }

  hasStarted() {
    return this.isRunning;
  }

  hasEnded() {
    return !this.isRunning;
  }

  playerJoin(controllerInstance) {
    if (this.players.filter((playerInList) => playerInList.id === controllerInstance.id).length != 0)
      return false;

    if (this.destroyTimeout)
      this.cancelDestroyTimeout();

    const player = new Player(controllerInstance.id);

    this.players.push(player);

    this.setEventHandlersForPlayer(controllerInstance);
    this.gameInfoUpdated();
    return true;
  }

  playerLeave(playerId) {
    if (this.players.indexOf(playerId) == -1) return false;

    this.players = this.players.filter(id => id !== playerId);

    if (!this.players.length) this.setDestroyTimeout();

    this.gameInfoUpdated();
    return true;
  }

  playerIsLeaderById(playerId) {
    return this.players[0] && this.players[0].id === playerId;
  }

  chatMessageSend(message) {
    if (message.message && message.login && this.isPlayerInGameByLogin(message.login)) {
      this.emit(GEvents.GE_CHAT_MESSAGE, message);
    }
  }

  gameStart(startInitiator) {
    logger.info(`${startInitiator} (leader? [${this.playerIsLeaderById(startInitiator)}]) has requested to start the game.`);
    if (!this.playerIsLeaderById(startInitiator))
      throw "You are not a leader.";

    this.isRunning = true;
//    this.gameMode();
    this.emit(GEvents.GE_GAME_STARTED);
  }

  gameModeStub(game) {
    const frequency = 50; // ms

    const updateFunction = () => {
      
    };

    const gameLoop = () => {
      const start = Date.now();
      let delay;

      logger.info('GameLoop tick.');
      updateFunction();

      if (!game.hasEnded()) {
        const end = Date.now();
        delay = end - start > frequency ? frequency : frequency - (end - start); 

        setTimeout(gameLoop, delay);
      }
    };

    const startLoop = () => {
      setTimeout(gameLoop, frequency);
    }

    return startLoop;
  }

  setEventHandlersForPlayer(player) {
    this.on(GEvents.GE_CHAT_MESSAGE, player.onChatMessageRecv.bind(player));
    this.on(GEvents.GE_INFO_UPDATE, player.onGameInfoUpdate.bind(player));
    this.on(GEvents.GE_GAME_STARTED, player.onGameStarted.bind(player));
  }

  getGameInfo() {
    return {
      id: this.id,
      isRunning: this.isRunning,
      leaderId: (this.players[0] && this.players[0].id),
      players: this.players.map((player) => {
        const user = UserService.getUserById(player.id);
        logger.info(`User[${player.id}] found? -> ${!!user}`);
        return user ? { login: user.getLogin() } : null;
      }).filter((userLogin) => (userLogin !== null)),
    };
  }

  isPlayerInGameByLogin(login) {
    return (
      this.players
        .filter( player => {
          const user = UserService.getUserById(player.id);
          return user ? user.getLogin() === login : false;
        })
        .length !== 0);
  }

  gameInfoUpdated() {
    this.emit(GEvents.GE_INFO_UPDATE, this.getGameInfo());
  }

  setDestroyTimeout() {
    this.destroyTimeout = setTimeout(this.destroySelf.bind(this), 5000);
  }

  cancelDestroyTimeout() {
    clearTimeout(this.destroyTimeout);
    this.destroyTimeout = null;
  }

  destroySelf() {
    logger.info(`Game ${this.id} emits destroy.`);
    this.emit('destroy', this.id);
  }
}

module.exports = Game;
