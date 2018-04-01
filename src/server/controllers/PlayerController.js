"use strict";

const logger = require("../logger");
const events = require("../../shared/types.js");
const uniqid = require("uniqid");
const gamesController = require("./gamesController");

class PlayerController {

  constructor(socket, playerId) {
    this.socket = socket;
    this.id = playerId;
    this.inGame = false;
    socket.on(events.client.GAME_CREATE, this.onGameCreate.bind(this));
    socket.on(events.client.GAME_JOIN, this.onGameJoin.bind(this));
    socket.on("disconnect", this.onDisconnect.bind(this));
  }

  onGameCreate(callback) {
    if (this.inGame) callback(this._respondError({"description": "You are already in game."}));

    const gameId = gamesController.createGame();
    logger.info(`Created game ${gameId}`);
    callback(gameId ? 
      this._respondSuccess({"gameId": gameId}) :
      this._respondError({"description": "Failed to create game."})
    );
  }

  onGameJoin(data, callback) {
    logger.info(`Trying to join game ${data.gameId}`);

    if (this.inGame) callback(this._respondError({"description": "Already in game."}));

    const { gameId } = data;
    const joined = gamesController.joinGame(gameId, this);

    logger.info(`Joined game? -> ${joined}`);

    if (joined) this.inGame = true;

    callback(joined ?
      this._respondSuccess() :
      this._respondError({"description": "Failed to join game."})
    );
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
