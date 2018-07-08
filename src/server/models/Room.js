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

  userLeave(userId) {
    if (!this.players.find(user => user.id === userId))
      return false;

    this.players = this.players.filter(user => user.id !== userId);
    if (!this.players.length)
      this.setDestroyTimeout()

    this.roomInfoUpdated();
    return true;
  }

  chatMessageSend(message) {
    if (message.message && message.login && this.isPlayerInRoomByLogin(message.login)) {
      this.chatHistory.push(message);
      this.emit(RoomEvents.R_CHAT_MESSAGE, message);
    }
  }

  getRoomInfo() {
    return {
      id: this.id,
      leaderId: (this.players[0] && this.players[0].id),
      players: this.players.map((playerId) => {
        const user = UserService.getUserById(playerId)
        return user ? { login: user.getLogin() } : undefined;
      }),
      chatHistory: this.chatHistory,
    };
  }

  isPlayerInRoomByLogin(login) {
    return (
      this.players
      .filter(playerId => {
        const user = UserService.getUserById(playerId);
        return user ? user.getLogin() === login : false;
      })
      .length !== 0
    );
  }

  roomInfoUpdated() {
    this.emit(RoomEvents.R_INFO_UPDATE, this.getRoomInfo());
  }

  setEventHandlersForPlayer(player) {
    this.on(RoomEvents.R_CHAT_MESSAGE, player.onChatMessageRecv.bind(player));
    this.on(RoomEvents.R_INFO_UPDATE, player.onRoomInfoUpdate.bind(player));
//    this.on(RoomEvents.R_STARTED, player.onGameStarted.bind(player));
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
    this.onDestroyCallback && this.onDestroyCallback();
  }

  onDestroy(callback) {
    this.onDestroyCallback = callback;
  }
}

module.exports = Room;
