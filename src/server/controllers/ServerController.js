"use strict";

const events = require("../../shared/types.js");
const logger = require("../logger");
const PlayerController = require("./PlayerController.js");

class ServerController {
  constructor(server) {
    this.io = require("socket.io")(server);

    this.io.on("connection", this.onConnection);
    logger.debug("Initialized socket.io");
  }

  onConnection(socket) { 
    PlayerController.manageConnection(socket);
  }
}

module.exports = (server) => {
  new ServerController(server)
}
