"use strict";

const events = require("../../shared/types.js");
const logger = require("../logger");
const MainController = require("./MainController.js");
const UserService = require("../services/UserService.js");

class ServerController {
  constructor(server) {
    this.io = require("socket.io")(server);
    this.io.on("connection", this.onConnection.bind(this));
    logger.debug("Initialized socket.io");
  }

  onConnection(socket) {
    let { id } = socket.handshake.query;
    if (!id || !UserService.getUserById(id)) {
      logger.info(
        `Either id[${id}] does not exist, or such user could not be found. Receiving new one.`
      );
      id = UserService.createUser();
    }
    new MainController(socket, id);
  }
}

module.exports = server => {
  new ServerController(server);
};
