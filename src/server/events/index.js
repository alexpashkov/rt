"use strict";

const logger = require("../logger");
<<<<<<< Updated upstream
const PlayersService = require("../services/PlayersService.js");
=======
const playersService = require("../services/players");
>>>>>>> Stashed changes

module.exports = server => {
  global.io = require("socket.io")(server);

  global.io.on("connection", socket => {
    logger.debug("Socket connected");
<<<<<<< Updated upstream

    let id = socket.handshake.query.id;
    socket.player = (id && PlayersService.playerExists(id)) ?
                    (PlayersService.getPlayer(id) && socket.player.socket = socket) :
                    PlayersService.createPlayer(socket);

    socket.on("dummy service", (data) => {
        player.acquire()
    });

    socket.emit("id", { id: player.id });

=======
    playersService.createPlayer(socket);
>>>>>>> Stashed changes
    socket.on("disconnect", () => logger.debug("Socket disconnected"));
  });
};
