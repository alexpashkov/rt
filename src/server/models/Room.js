"use strict";

const UserService = require("../services/UserService.js");
const { EventEmitter } = require("events");
const logger = require("../logger");

const RoomEvents = {
  R_STARTED: "R_STARTED",
  R_START_FAILED: "R_START_FAILED",
  R_INFO_UPDATE: "R_INFO_UPDATE",
  R_CHAT_MESSAGE: "R_CHAT_MESSAGE",
};

class Room extends EventEmitter {
  constructor(id, handlers) {
    super();
    this.id = id;
    this.players = [];
    this.chatHistory = [];
    this.configuration = {};
    this.setDestroyTimeout();
    this.onDestroy(handlers.onDestroy);
  }

  userJoin(userController) {
    if (this.players.includes(userController))
      return false;

    if (this.destroyTimeout)
      this.cancelDestroyTimeout();

    this.players.push(userController.id);
    this.setEventHandlersForPlayer(userController);
    this.roomInfoUpdated();
    return true;
  }

  userLeave(leavingUserId) {
    if (!this.players.find(userId => userId === leavingUserId))
      return false;

    this.players = this.players.filter(userId => userId !== leavingUserId);
    if (!this.players.length)
      this.setDestroyTimeout()

    this.roomInfoUpdated();
    return true;
  }

  gameStart(starterId) {
    logger.info(
      `${starterId} (leader? [${this.playerIsLeaderById(
        starterId
      )}]) has requested to start the game.`
    );

    if (this.leaderId !== starterId)
      throw `You[${starterId}] are not a leader.`;

    const gameId = GamesController.createGame(
      this.id,
      this.players,
      this.configuratio
    ); /* New ID or existing one? */

    const game = GamesController.getGameById(gameId);
    game.gameStart();

    this.emit(RoomEvents.R_STARTED, gameId);
  }

  chatMessageSend(message) {
    logger.debug(`Sending message: ${JSON.stringify(message)}`);
    if (message.message && message.login && this.isPlayerInRoomByLogin(message.login)) {
      this.chatHistory.push(message);
      this.emit(RoomEvents.R_CHAT_MESSAGE, message);
    }
  }

  getRoomInfo() {
    return {
      id: this.id,
      leaderId: (this.players[0] && this.players[0]) || null,
      players: this.players.map(userId => ({ login: UserService.getUserById(userId).getLogin()})),
      chatHistory: this.chatHistory,
    };
  }

  isPlayerInRoomByLogin(login) {
    return (
      this.players
      .filter(userId => UserService.getUserById(userId).getLogin() === login)
      .length !== 0
    );
  }

  roomInfoUpdated() {
    this.emit(RoomEvents.R_INFO_UPDATE, this.getRoomInfo());
  }

  setEventHandlersForPlayer(player) {
    this.on(RoomEvents.R_CHAT_MESSAGE, player.onChatMessageRecv.bind(player));
    this.on(RoomEvents.R_INFO_UPDATE, player.onRoomInfoUpdate.bind(player));
    this.on(RoomEvents.R_STARTED, player.onGameStarted.bind(player));
  }

  setDestroyTimeout() {
    logger.debug(`Destroy timeout set for room ${this.id}`);
    this.destroyTimeout = setTimeout(this.destroySelf.bind(this), 5000);
  }

  cancelDestroyTimeout() {
    logger.debug(`Destroy timeout cancelled for room ${this.id}`);
    clearTimeout(this.destroyTimeout);
    this.destroyTimeout = null;
  }

  destroySelf() {
    this.onDestroyCallback && this.onDestroyCallback(this.id);
  }

  onDestroy(callback) {
    this.onDestroyCallback = callback;
  }
}

module.exports = Room;
