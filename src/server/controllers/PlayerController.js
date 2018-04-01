"use strict";

const events = require("../../shared/types.js");
const uniqid = require("uniqid");
const GamesController = require("./GamesController");

class PlayerController {

  constructor(socket, playerId) {
    this.socket = socket;
    this.id = playerId;
    socket.on(events.client.GAME_CREATE, this.onGameCreate);
    socket.on(events.client.GAME_JOIN, this.onGameJoin);
    socket.on("disconnect", this.onDisconnect);
  }

  onGameCreate(callback) {
    callback(this._respondSuccess({"gameId": 1}));
  }

  onGameJoin(data, callback) {
    callback(this._respondSuccess());
  }

  onDisconnect() {
    
  }

  _respondSuccess(data) {
    return Object.assign({"status": "success"}, data);
  }

  _respondError(data) {
    return Object.assign({"status": "error"}, data);
  }

}

module.exports = PlayerController;
