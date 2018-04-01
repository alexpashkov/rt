"use strict";

const events = require("../../shared/types.js");
const logger = require("../logger");
const playerController = require("./PlayerController.js");
const playerService = require("../services/PlayerService.js");

class ServerController {
  constructor(server) {
    this.io = require("socket.io")(server);

    this.io.on("connection", this.onConnection);
    logger.debug("Initialized socket.io");
  }

  onConnection(socket) { 
    let { playerId } = socket.handshake.query;

    if (!playerId || !playerService.getPlayerById(playerId)) {
      playerId = playerService.createPlayer();
    }

    new playerController(socket, playerId);
  }
}

module.exports = (server) => {
  new ServerController(server)
}
