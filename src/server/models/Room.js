'use strict';

const UserService = require("../services/UserService");
const GamesController = require("../controllers/GamesController");
const { EventEmitter } = require("events");
const logger = require("../logger");
const assert = require('assert');

const RoomEvents = {
  R_STARTED: 'R_STARTED',
  R_START_FAILED: 'R_START_FAILED',
  R_INFO_UPDATE: 'R_INFO_UPDATE',
  R_CHAT_MESSAGE: 'R_CHAT_MESSAGE'
};

class Room extends EventEmitter {
  constructor(id, handlers) {
    super();
    this.id = id;
    this.isRunning = false;
    this.players = [];
    this.chatHistory = [];
    this.configuration = {};
    this.setDestroyTimeout();
    this.onDestroy(handlers.onDestroy);
  }

  userJoin(userController) {
    if (this.players.includes(userController))
      return false;

    if (this.isRunning)
      return false;

    if (this.destroyTimeout)
      this.cancelDestroyTimeout();

    this.players.push(userController);
    this.setEventHandlersForPlayer(userController);
    this.roomInfoUpdated();
    return true;
  }

  userLeave(leavingUserId) {
    if (!this.players.find(user => user.id === leavingUserId))
      return false;

    const leavingPlayer = this.players.find(user => user.id === leavingUserId);
    this.unsetEventHandlersForPlayer(leavingPlayer);

    this.players = this.players.filter(user => user.id !== leavingUserId);

    if (!this.players.length)
      this.setDestroyTimeout();

    this.roomInfoUpdated();
    return true;
  }

  gameStart(starterId) {
    logger.info(
      `${starterId} (leader? [${starterId === this.getLeaderId()}]) has requested to start the game.`
    );

    if (this.getLeaderId() !== starterId)
      throw `You[${starterId}] are not a leader.`;

    const gameId = GamesController.createGame(
      this.id,
      this.players,
      this.configuration
    ); /* New ID or existing one? */

    const game = GamesController.getGameById(gameId);
    game.setOnDestroyHandler(this.onGameDestroy.bind(this));
    game.gameStart();

    this.gameId = gameId;
    this.isRunning = true;

    this.emit(RoomEvents.R_STARTED, gameId);
  }

  chatMessageSend(message) {
    logger.debug(`Sending message: ${JSON.stringify(message)}`);
    if (message.message && message.login && this.isPlayerInRoomByLogin(message.login)) {
      this.chatHistory.push(message);
      this.emit(RoomEvents.R_CHAT_MESSAGE, message);
    }
  }

  getLeaderId() {
    return this.players[0].id;
  }

  getRoomInfo() {
    return {
      id: this.id,
      isRunning: this.isRunning,
      leaderId: (this.players[0] && this.players[0].id) || null,
      players: this.players.map(user => ({ login: UserService.getUserById(user.id).getLogin()})),
      chatHistory: this.chatHistory,
    };
  }

  isPlayerInRoomByLogin(login) {
    return (
      this.players
      .filter(user => UserService.getUserById(user.id).getLogin() === login)
      .length !== 0
    );
  }

  roomInfoUpdated() {
    this.emit(RoomEvents.R_INFO_UPDATE, this.getRoomInfo());
  }

  setEventHandlersForPlayer(player) {
    player._roomHandlers = {
      onChatMessageRecv: player.onChatMessageRecv.bind(player),
      onRoomInfoUpdate: player.onRoomInfoUpdate.bind(player),
      onGameStarted: player.onGameStarted.bind(player)
    };
    this.on(RoomEvents.R_CHAT_MESSAGE, player._roomHandlers.onChatMessageRecv);
    this.on(RoomEvents.R_INFO_UPDATE, player._roomHandlers.onRoomInfoUpdate);
    this.on(RoomEvents.R_STARTED, player._roomHandlers.onGameStarted);
  }

  unsetEventHandlersForPlayer(player) {
    this.removeListener(RoomEvents.R_CHAT_MESSAGE, player._roomHandlers.onChatMessageRecv);
    this.removeListener(RoomEvents.R_INFO_UPDATE, player._roomHandlers.onRoomInfoUpdate);
    this.removeListener(RoomEvents.R_STARTED, player._roomHandlers.onGameStarted);
    player._roomHandlers = undefined;
  }

  onGameDestroy(gameId) {
    assert(this.gameId === this.gameId);

    this.isRunning = false;
    this.gameId = null;
    this.roomInfoUpdated();
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
