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
    socket.on(events.client.GAME_LEAVE, this.onGameLeave.bind(this));
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
    logger.info(`Trying to join game ${data.id}`);

    if (this.inGame) callback(this._respondError({"description": "Already in game."}));

    const { id } = data;
    const joined = gamesController.joinGame(id, this);

    logger.info(`Joined game? -> ${joined}`);

    if (joined) this.inGame = true;

    callback(joined ?
      this._respondSuccess() :
      this._respondError({"description": "Failed to join game."})
    );
  }

  onGameLeave(data, callback) {
    const { id } = data;

    callback = callback || (() => {});

    logger.info(`Player ${this.id} requested to leave game ${id}`);

    if (!this.inGame) callback(this._respondError({"description": "Not in game."}));

    gamesController.leaveGame(id, this.id) ?
      callback(this._respondSuccess()) :
      callback(this._respondError({"description": "Invalid game ID."}));
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
