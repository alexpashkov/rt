"use strict";


exports.PLAYER_CONNECTED = "PLAYER_CONNECTED";
exports.PLAYER_SET_LOGIN = "PLAYER_SET_LOGIN";

exports.GAMES_UPDATE  = "GAMES_UPDATE";
exports.GAMES_LIST    = "GAMES_LIST";
exports.GAME_CREATE   = "GAME_CREATE";
exports.GAME_JOIN     = "GAME_JOIN";
exports.GAME_CHAT_MESSAGE_SEND = "GAME_CHAT_MESSAGE_SEND";

module.exports = {
  client: {
    GAME_CREATE: "GAME_CREATE",
    GAME_JOIN: "GAME_JOIN",
  },
  server: {
    PLAYER_CONNECTED: "PLAYER_CONNECTED",
    GAMES_UPDATE: "GAMES_UPDATE",
  }
}
