'use strict';

const logger = require('../logger');
const events = require('../../shared/socket-events.js');
const assert = require('assert');
const GamesController = require('./GamesController');
const RoomsController = require('./RoomsController');
const UserService = require('../services/UserService');
const moveValidator = () => true;

class MainController {
  constructor(socket, userId) {
    this.socket = socket;
    this.inGame = false;
    this.roomId = null;
    this.gameId = null;
    this.id = UserService.getUserById(userId) ? userId : UserService.createUser();

    this.setupEventHandlers();

    /* This is created to perform unsubscription by function address */
    this.onRoomsUpdateCallback = this.onRoomsUpdate.bind(this);
    RoomsController.subscribeOnUpdates(this.onRoomsUpdateCallback);

    socket.emit(events.server.USER_CONNECTED, {
      id: userId
    });
  }

  setupEventHandlers() {
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    this.socket.on(events.client.ROOM_CREATE, this.onRoomCreate.bind(this));
    this.socket.on(events.client.ROOM_JOIN, this.onRoomJoin.bind(this));
    this.socket.on(events.client.ROOM_LEAVE, this.onRoomLeave.bind(this));
    this.socket.on(events.client.ROOMS_UPDATE_REQUEST, this.onRoomsUpdateRequest.bind(this));
    this.socket.on(events.client.ROOM_CHAT_MESSAGE, this.onChatMessageSend.bind(this));
    this.socket.on(events.client.GAME_START, this.onGameStartRequest.bind(this));
    this.socket.on(events.client.GAME_PIECE_MOVE, this.onGamePieceMove.bind(this));
    this.socket.on(events.client.GAME_PIECE_ROTATE, this.onGamePieceRotate.bind(this));
    this.socket.on(events.client.GAME_PIECE_DROP, this.onGamePieceDrop.bind(this));
    this.socket.on(events.client.GAME_LEAVE, this.onGameLeave.bind(this));
  }

  onRoomCreate(callback) {
    if (this.inGame || this.roomId) {
      callback(this._respondError({ description: 'You are already in the room.' }));
      return;
    }

    const roomId = RoomsController.createRoom();
    logger.info(`Created room ${roomId}`);
    callback(
      roomId
        ? this._respondSuccess({ roomId: roomId })
        : this._respondError({ description: 'Failed to create room.' })
    );
  }

  onRoomJoin(data, callback) {
    if (this.inGame || this.roomId) {
      logger.info(`Player ${this.id} cannot join the room while playing or being in one already!`);
      callback(this._respondError({ description: 'You are already in a room or a game.' }));
      return ;
    }

    const { id } = data;
    const joined = RoomsController.joinRoom(id, this);
    let roomInfo = null;

    logger.info(`Joined game? -> ${joined}`);

    if (joined) {
      this.roomId = id;
      roomInfo = RoomsController.getRoomById(id).getRoomInfo();
    }

    callback(
      joined
        ? this._respondSuccess({ roomInfo: roomInfo })
        : this._respondError({ description: 'Failed to join game.' })
    );
  }

  onRoomLeave(data, callback) {
    const { id } = data;

    callback = callback || (() => {});

    logger.info(`User ${this.id} requested to leave room ${id}`);
    logger.info(`this.roomId -> ${this.roomId}`);

    if (!this.roomId) {
      callback(this._respondError({ description: 'Not in room.' }));
      return;
    }

    if (RoomsController.leaveRoom(id, this.id)) {
      this.roomId = null;
      callback(this._respondSuccess());
    } else {
      callback(this._respondError({ description: 'Invalid room ID.' }));
    }
  }

  onGameStartRequest(callback) {
    logger.debug(`Request to start game. In game? [${this.inGame}]`);

    if (this.inGame) {
      callback(this._respondError({ description: 'You are already playing the game...' }));
      return;
    } else if (!this.roomId) {
      callback(this._respondError({ description: 'You are not present in any room.' }));
      return;
    } else if (!RoomsController.getRoomById(this.roomId)) {
      this.roomId = null;
      callback(
        this._respondError({ description: 'Your room has been destroyed.' })
      );
      return;
    }

    try {
      RoomsController.getRoomById(this.roomId).gameStart(this.id);
      callback(this._respondSuccess());
      this.gameId = this.roomId;
    } catch (_error) {
      logger.info(`Error: ${_error}`);
      callback(this._respondError({ description: _error }));
    }
  }

  onGameLeave() {
    if (!this.gameId) {
      logger.error('Trying to leave the game while not in one.');
      return ;
    }

    const game = GamesController.getGameById(this.gameId);
    assert(game);

    game.playerLeave(this.id);

    this.gameId = null;
    this.roomId = null;
  }

  onGameStarted(gameId) {
    this.gameId = gameId;
    this.socket.emit(events.server.GAME_STARTED);
  }

  onRoomsUpdate(rooms) {
    logger.debug(`Emitting ROOMS_UPDATE: ${rooms}`);
    this.socket.emit(events.server.ROOMS_UPDATE, rooms);
  }

  onRoomInfoUpdate(roomInfo) {
    this.socket.emit(events.server.ROOM_INFO_UPDATE, roomInfo);
  }

  onPieceUpdate(data) {
    assert.ok(data);
    logger.debug(`Piece updated -> ${JSON.stringify(data)}`);
    if (data.id !== this.id)
      return ;

    this.socket.emit(events.server.GAME_PIECE_CURRENT, data);
  }

  onNextPieceUpdate(data) {
    assert.ok(data);
    if (data.id !== this.id)
      return ;

    logger.debug(`Next piece updated -> ${JSON.stringify(data)}`);
    this.socket.emit(events.server.GAME_PIECE_NEXT, data);
  }

  onBoardUpdate(data) {
    assert.ok(data);
    // if (data.id !== this.id) return; XXX: Enable for separate spectres.

    logger.debug(`Board updated -> ${JSON.stringify(data)}`);
    this.socket.emit(events.server.GAME_BOARD_CURRENT, data);
  }

  onLineFilled(data) {
    assert.ok(data);
  }

  onGameFinished() {
    this.socket.emit(events.server.GAME_FINISHED);
  }

  onRoomsUpdateRequest() {
    logger.debug('ROOMS_UPDATE event requested.');
    this.onRoomsUpdate(RoomsController.getRooms());
  }

  onGamePieceMove(data, callback = () => true) {
    if (typeof data !== 'string' || !['left', 'right', 'down'].includes(data)) {
      logger.error(`onGamePieceMove received invalid data = ${data}`);
      callback(false);
      return ;
    }

    if (!this.gameId) {
      logger.error(`Player[${this.id}] is not in game.`);
      callback(false);
      return ;
    }
    
    logger.debug(`Player[${this.id}] has requested to move his piece ${data}.`);
    const game = GamesController.getGameById(this.gameId);
    if (!game) {
      logger.error(`Game ${this.gameId} does not exist.`);
      this.gameId = null;
      callback(false);
      return ;
    }

    const player = game.getPlayerById(this.id);
    assert(player);

    if (!player.movePiece(data)) {
      logger.error(`Can't move player's ${this.id} piece ${data}`);
      callback(false);
    }

    callback(true);
  }

  onGamePieceRotate(data, callback = () => true) {
    if (typeof data !== 'string' && ['left', 'right'].indexOf(data) === -1) {
      logger.error(`onGamePieceRotate received invalid data = ${data}`);
      callback(false);
      return ;
    }

    if (!this.gameId) {
      logger.error(`Player[${this.id}] is not in game`);
      callback(false);
      return ;
    }

    logger.debug(`Player[${this.id}] has requested to rotate his piece ${data}`);
    const game = GamesController.getGameById(this.gameId);
    assert(game);

    const player = game.getPlayerById(this.id);
    assert(player);

    if (!player.rotatePiece(data)) {
      logger.error(`Can't rotate player's ${this.id} piece ${data}`);
      callback(false);
    }

    callback(true);
  }

  onGamePieceDrop(data, callback = () => true) {
    if (!this.gameId) {
      logger.error(`Player [${this.id}] is not in game`);
      callback(false);
      return ;
    }

    const game = GamesController.getGameById(this.gameId);
    assert(game);

    const player = game.getPlayerById(this.id);
    assert(player);

    if (!player.dropPiece()) {
      logger.error(`Can't drop players ${this.id} piece.`);
      callback(false);
    }

    callback(true);
  }

  onChatMessageSend(messageText) {
    if (!this.roomId)
      return;

    const login = UserService.getUserById(this.id).getLogin();
    const id = `${login}_${process.hrtime()}`;

    logger.debug(`Sending message with id ${id}`);

    RoomsController.chatMessageSend(this.roomId, {
      id: id,
      login: login,
      message: messageText
    });
  }

  onChatMessageRecv(message) {
    this.socket.emit(events.server.ROOM_CHAT_MESSAGE, message);
  }

  onPlayerHasDisconnected(playerInfo) {
    this.socket.emit(events.server.GAME_PLAYER_DISCONNECTED, playerInfo);
  }

  onPlayerHasLost(playerInfo) {
    this.socket.emit(events.server.GAME_PLAYER_HAS_LOST, playerInfo);
  }

  onPlayerHasLeft(playerInfo) {
    this.socket.emit(events.server.GAME_PLAYER_HAS_LEFT, playerInfo);
  }

  onGameDestroy(gameId) {
    logger.error(`${this.gameId} -- ${gameId}`);
    assert(this.gameId === gameId);

    logger.debug(`The game ${gameId} is destroyed.`);
    this.gameId = null;
  }

  onDisconnect() {
    logger.info('DISCONNECT EVENT FIRED');
    RoomsController.unsubscribeOnUpdates(this.onRoomsUpdateCallback);
    if (this.roomId) {
      logger.info(`User ${this.id} leaves room ${this.roomId}`);
      RoomsController.leaveRoom(this.roomId, this.id);
    }

    if (this.gameId) {
      logger.info(`User ${this.id} leaves game ${this.gameId}`);
      const game = GamesController.getGameById(this.gameId);
      assert(game);
      const player = game.getPlayerById(this.id);
      assert(player);
      player.disconnect();
    }
  }

  _respondSuccess(data) {
    return Object.assign({ status: 'success' }, data);
  }

  _respondError(data) {
    return Object.assign({ status: 'error' }, data);
  }
}

module.exports = MainController;
