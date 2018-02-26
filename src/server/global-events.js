const logger =  require("./logger");
const games = require("./models/games");

global.io.on("connection", socket => {
  global.io.emit("GAMES_UPDATE", games.getAll());
  socket.on("disconnect", () => logger.info("Socket disconnected"));
});