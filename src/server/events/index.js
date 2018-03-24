'use strict';

const logger = require("../logger");

module.exports = server => {
  global.io = require("socket.io")(server);
  global.io.on("connection", socket => {
    logger.debug("Socket connected");
    socket.on("disconnect", () => logger.debug("Socket disconnected"));
  });
};

//class Player {
//  constructor(socket) {
//    this._initEventHandlers(socket);
//  }
//
//  onGameFinished() {
//    this.socket
//  }
//
//  onDisconnect() {
//    PlayersRepository.getInstance().onPlayerLeave(this.hash);
//  }
//
//  _initEventHandlers(socket) {
//    socket.on("createGame", () => {
//      gameService.createGame();
//    });
//    socket.on("getGames", this.getGames.bind(this));
////   "getGames",
////   "createGame",
////   "startGame",
////   "joinGame",
////   "leaveGame",
////   "pauseGame",
////   "resumeGame",
////   "placePiece",
////   "collectLine",
////   "disconnect"
//  }
//  getGames() {
//
//  }
//}
//
//class PlayersRepository {
//  constructor() {
//    if (PlayersRepository._instance) {
//      return PlayersRepository._instance;
//    }
//    PlayersRepository._instance = this;
//
//    this.players = {};
//  }
//
//  static getInstance() {
//    return PlayersRepository._instance;
//  }
//
//  createPlayer(socket) {
//    let newPlayer = new Player(socket);
//
//    this.players[newPlayer.getHash()] = newPlayer;
//
//    return newPlayer;
//  }

//  getPlayer(hash) {
//   return (this.players[hash] || null);
//  }
//
//  deletePlayer(hash) {
//    delete this.players[hash];
//  }
//
//  onPlayerLeave(playerLeaved) {
//    !playerLeaved.inGame() && deletePlayer(playerLeaved.getHash());
//   }
// }
