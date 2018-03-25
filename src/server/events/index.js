"use strict";

const logger = require("../logger");
const events = require("./types.js");
const PlayersService = require("../services/PlayersService.js");
const GamesService = require("../services/GamesService.js");

module.exports = server => {
  global.io = require("socket.io")(server);

  global.io.on("connection", socket => {
    logger.debug("Socket connected");
    const id = socket.handshake.query.id;
    const player = (() => {

      if (id && PlayersService.playerExists(id)) {
        let _player = PlayersService.getPlayer(id);
        _player.socket = socket;
        return _player;
      }

      return PlayersService.createPlayer(socket);
    })();

    socket.emit("id", { id: player.id });

    socket.on(events.GAME_CREATE, (callback) => {
      if (player.inGame()) {
        callback({
          "status": "error",
          "description": "You are already in game."
        });
        return ;
      }

      player.gameId = GamesService.createGame(player.id);
      socket.join(`game_${player.gameId}`);
      callback({
        "status": "success",
        "gameId": player.gameId
      });
    });

    socket.on(events.GAME_JOIN, (data, callback) => {
      if (player.inGame()) {
        callback({
          "status": "error",
          "description": "You are already in game."
        });
        return;
      }

      const gameToJoin = GamesService.getGame(data.id);

      if (gameToJoin) {
        gameToJoin.addPlayer(player.id);
        callback({
          "status": "success"
        });
      } else {
        callback({
          "status": "error",
          "description": "Game with such ID does not exist"
        });
      }
    });

    socket.on("disconnect", () => {
      logger.debug("Socket disconnected");
      player.socket = null;
      if (player.gameId) {
        GamesService.getGame(player.gameId).notifyDisconnected(player.id);
      }
    });
  });
};
