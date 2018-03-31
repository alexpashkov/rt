"use strict";

const logger = require("../logger");
const events = require("./types.js");
const PlayersService = require("../services/PlayersService.js");
const GamesService = require("../services/GamesService.js");

function paramDecorator(handler, param) {
  return (data, callback) => {
    handler(param, data, callback);
  };
}

function onGameCreate(params, callback) {
  const player = params.player;

  if (player.inGame()) {
    callback({
      "status":"error",
      "description": "You are already in game."
    });
    return ;
  }

  player.gameId = GamesService.createGame(player.id);
  player.socket.join(`game_${player.gameId}`);
  callback({
    "status": "success",
    "gameId": player.gameId
  });
}

function onGameJoin(params, callback) {
  const player = params.player;

  if (player.inGame()) {
    callback({
      "status": "error",
      "description": "You are already in game."
    });
  }

  const gameToJoin = GamesService.getGame(data.id);

  if (gameToJoin) {
    gameToJoin.addPlayer(player.id);
    callback({ "status": "success" });
  } else {
    callback({
      "status": "error",
      "description": "Game with such ID does not exist"
    });
  }
}

function onDisconnect(params) {
  const player = params.player;

  logger.debug("Socket disconnected");

  player.socket = null;

  if (player.gameId) {
    GamesService.getGame(player.gameId).notifyDisconnected(player.id);
  }

  player.free();
}

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

    GamesService.subscribeSocketOnUpdates(socket);

    socket.emit(events.PLAYER_CONNECTED, {
      id: player.id,
      gameId: player.inGame() ? player.getGameId() : null
    });

    socket.on(events.GAME_CREATE, paramDecorator(onGameCreate, {player: player}));
    socket.on(events.GAME_JOIN, paramDecorator(onGameJoin, {player: player}));
    socket.on("disconnect", paramDecorator(onDisconnect, {player: player}));
  });
};
