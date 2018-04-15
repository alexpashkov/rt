"use strict";

const events = require("../../shared/types.js");
const logger = require("../logger");
const PlayerController = require("./PlayerController.js");
const PlayerService = require("../services/PlayerService.js");

class ServerController {
  constructor(server) {
    this.io = require("socket.io")(server);
    this.io.on("connection", this.onConnection.bind(this));
    logger.debug("Initialized socket.io");
  }
  onConnection(socket) {
    let { playerId } = socket.handshake.query;
    if (!playerId || !PlayerService.getPlayerById(playerId)) {
      logger.info(
        `Either playerId[${playerId}] does not exist, or such player could not be found. Receiving new one.`
      );
      playerId = PlayerService.createPlayer();
    }
    new PlayerController(socket, playerId);
  }
}

module.exports = server => {
  new ServerController(server);
};
