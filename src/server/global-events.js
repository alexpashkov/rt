const logger = require("./logger");
const gamesService = require("./services/games");

module.exports = server => {
  global.io = require("socket.io")(server);
  global.io.on("connection", socket => {
    gamesService
      .getAllGames()
      .then(games => global.io.emit("GAMES_UPDATE", games));
    socket.on("disconnect", () => logger.info("Socket disconnected"));
  });
};
