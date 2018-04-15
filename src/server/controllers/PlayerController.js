"use strict";

const logger = require("../logger");
const events = require("../../shared/types.js");
// const uniqid = require("uniqid");
const gamesController = require("./gamesController");
const playerService = require("../services/playerService");

class PlayerController {
  constructor(socket, playerId) {
    this.socket = socket;
    this.id = playerId;
    this.inGame = false;
    this.gameId = null;

    socket.on("disconnect", this.onDisconnect.bind(this));
    socket.on(events.client.GAME_CREATE, this.onGameCreate.bind(this));
    socket.on(events.client.GAME_JOIN, this.onGameJoin.bind(this));
    socket.on(events.client.GAME_LEAVE, this.onGameLeave.bind(this));
    socket.on(events.client.GAME_START, this.onGameStartRequest.bind(this));
    socket.on(events.client.GAMES_UPDATE_REQUEST, this.onGamesUpdateRequest.bind(this));
    socket.on(events.client.GAME_CHAT_MESSAGE, this.onChatMessageSend.bind(this));

    /* This is created to perform unsubscription by function address */
    this.onGamesUpdateCallback = this.onGamesUpdate.bind(this);
    gamesController.subscribePlayerOnGamesUpdate(this.onGamesUpdateCallback);

    socket.emit(events.server.PLAYER_CONNECTED, {
      id: playerId
    });
  }

  onGameCreate(callback) {
    if (this.inGame) {
      callback(this._respondError({ description: "You are already in game." }));
      return ;
    }

    const gameId = gamesController.createGame();
    logger.info(`Created game ${gameId}`);
    callback(
      gameId
        ? this._respondSuccess({ gameId: gameId })
        : this._respondError({ description: "Failed to create game." })
    );
  }

  onGameJoin(data, callback) {
    logger.info(`Trying to join game ${data.id}`);

    if (this.inGame) {
      callback(this._respondError({ description: "Already in game." }));
      return ;
    }

    const { id } = data;
    const joined = gamesController.joinGame(id, this);
    let gameInfo = null;

    logger.info(`Joined game? -> ${joined}`);

    if (joined) {
      this.inGame = true;
      this.gameId = id;
      gameInfo = gamesController.getGameById(id).getGameInfo();
    }

    callback(
      joined
        ? this._respondSuccess({ gameInfo: gameInfo })
        : this._respondError({ description: "Failed to join game." })
    );
  }

  onGameLeave(data, callback) {
    const { id } = data;

    callback = callback || (() => {});

    logger.info(`Player ${this.id} requested to leave game ${id}`);

    if (!this.inGame) {
      callback(this._respondError({ description: "Not in game." }));
      return ;
    }

    if (gamesController.leaveGame(id, this.id)) {
      this.inGame = false;
      callback(this._respondSuccess());
    } else {
      callback(this._respondError({ description: "Invalid game ID." }));
    }
  }

  onGameStartRequest(callback) {
    logger.debug(`Request to start game. In game? [${this.inGame}]`);

    if (!this.inGame) {
      callback(this._respondError({ description: "You are not in game." }));
      return ;
    }

    try {
      gamesController.getGameById(this.gameId).gameStart(this.id);
      callback(this._respondSuccess());
    } catch (_error) {
      callback(this._respondError({ description: _error }));
    }
  }

  onGameStarted() {
    this.socket.emit(events.server.GAME_STARTED);
  }

  onGamesUpdateRequest() {
    logger.debug("GAMES_UPDATE event requested.");
    this.onGamesUpdate(gamesController.getGames());
  }

  onGamesUpdate(games) {
    logger.debug(`Emitting GAMES_UPDATE: ${games}`);
    this.socket.emit(events.server.GAMES_UPDATE, games);
  }

  onGameInfoUpdate(gameInfo) {
    this.socket.emit(events.server.GAME_INFO_UPDATE, gameInfo);
  }

  onChatMessageSend(messageText) {
    if (!this.inGame) return;

    const login = playerService.getPlayerById(this.id).getLogin();
    const id = `${login}_${process.hrtime()}`;

    logger.debug(`Sending message with id ${id}`);

    gamesController.chatMessageSend(this.gameId, {
      id: id,
      login: login,
      message: messageText
    });
  }

  onChatMessageRecv(message) {
    this.socket.emit(events.server.GAME_CHAT_MESSAGE, message);
  }

  onDisconnect() {
    logger.info("DISCONNECT EVENT FIRED");
    gamesController.unsubscribePlayerOnGamesUpdate(this.onGamesUpdateCallback);
    if (this.inGame) {
      logger.info(`Player ${this.id} leaves game ${this.gameId}`);
      gamesController.leaveGame(this.gameId, this.id);
    } else {
      logger.info(`No game to leave for player ${this.id}`);
    }
  }

  _respondSuccess(data) {
    return Object.assign({ status: "success" }, data);
  }

  _respondError(data) {
    return Object.assign({ status: "error" }, data);
  }
}

module.exports = PlayerController;
