const logger = require("./logger");
const gamesService = require("./services/games");

module.exports = server => {
  global.io = require("socket.io")(server);
  global.io.on("connection", socket => {
    global.io.emit("GAMES_UPDATE", gamesService.getAll());
    socket.on("disconnect", () => logger.info("Socket disconnected"));
  });
};
