'use strict';

const logger = require("../logger");
const gamesService = require("../services/games");
const globalEventTypes = require("./event-types");

module.exports = server => {
  global.io = require("socket.io")(server);
  global.io.on("connection", socket => {
    gamesService
      .getAllGames()
      .then(games => global.io.emit(globalEventTypes.GAMES_UPDATE, games));
    socket.on("disconnect", () => logger.info("Socket disconnected"));
  });
};
