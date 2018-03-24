'use strict';

const logger = require("../logger");
const PlayersService = require("../services/PlayersService.js");

module.exports = server => {
  global.io = require("socket.io")(server);

  global.io.on("connection", socket => {
    logger.debug("Socket connected");

    let id = socket.handshake.query.id;
    socket.player = (id && PlayersService.playerExists(id)) ?
                    PlayersService.getPlayer(id) :
                    PlayersService.createPlayer(null);

    socket.player.socket = socket;

    socket.on("dummy service", (data) => {
        player.acquire()
    });

    socket.emit("id", { id: player.id });

    socket.on("disconnect", () => logger.debug("Socket disconnected"));
  });
};
