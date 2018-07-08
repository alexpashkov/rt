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
    this.id = userId;
    this.inGame = false;
    this.roomId = null;
    this.gameId = null;

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
    this.socket.on(events.client.GAME_CREATE, this.onRoomCreate.bind(this));
    this.socket.on(events.client.GAME_JOIN, this.onRoomJoin.bind(this));
    this.socket.on(events.client.GAME_LEAVE, this.onRoomLeave.bind(this));
    this.socket.on(events.client.GAME_START, this.onGameStartRequest.bind(this));
    this.socket.on(events.client.GAMES_UPDATE_REQUEST, this.onRoomsUpdateRequest.bind(this));
    this.socket.on(events.client.GAME_CHAT_MESSAGE, this.onChatMessageSend.bind(this));
    this.socket.on(events.client.GAME_PIECE_MOVE, this.onGamePieceMove.bind(this));
    this.socket.on(events.client.GAME_PIECE_ROTATE, this.onGamePieceRotate.bind(this));
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
        ? this._respondSuccess({ gameId: roomId }) /* XXX: Change pls :( */
        : this._respondError({ description: 'Failed to create room.' })
    );
  }

  onRoomJoin(data, callback) {
    if (this.inGame || this.roomId) {
      logger.info('You cannot join the room while playing or being in one already!');
      callback(this._respondError({ description: 'You are already in room or game for fucks sake.' }));
      return;
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
        ? this._respondSuccess({ gameInfo: roomInfo }) /* XXX: Change pls :( */
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
      this.roomId = null;
    } catch (_error) {
      logger.info(`Error: ${_error}`);
      callback(this._respondError({ description: _error }));
    }
  }

  onGameStarted() {
    this.socket.emit(events.server.GAME_STARTED);
  }

  onRoomsUpdate(rooms) {
    logger.debug(`Emitting ROOMS_UPDATE: ${rooms}`);
    this.socket.emit(events.server.GAMES_UPDATE, rooms); /* XXX: Fix me pls :( */
  }

  onRoomInfoUpdate(roomInfo) {
    this.socket.emit(events.server.GAME_INFO_UPDATE, roomInfo); /* XXX: Fix me pls :( */
  }

  onPieceUpdate(data) {
    assert.ok(data);
    if (data.id !== this.id) return;

    logger.debug(`Piece updated -> ${JSON.stringify(data)}`);
    this.socket.emit(events.server.GAME_PIECE_CURRENT, data);
  }

  onBoardUpdate(data) {
    assert.ok(data);
    if (data.id !== this.id) return;

    logger.debug(`Board updated -> ${JSON.stringify(data)}`);
    this.socket.emit(events.server.GAME_BOARD_CURRENT, data);
  }

  onRoomsUpdateRequest() {
    logger.debug('GAMES_UPDATE event requested.'); /* XXX: Fix me :( */
    this.onRoomsUpdate(RoomsController.getRooms());
  }

  onGamePieceMove(data, callback = () => true) {
    if (typeof data !== 'string' && ['left', 'right', 'down'].indexOf(data) === -1) {
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
    if (!game) {
      logger.error(`Game ${this.gameId} does not exist.`);
      this.gameId = null;
      callback(false);
      return ;
    }

    const player = game.getPlayerById(this.id);
    assert(player);

    if (!player.rotatePiece(data)) {
      logger.error(`Can't rotate player's ${this.id} piece ${data}`);
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

    RoomsController.chatMessageSend(this.gameId, {
      id: id,
      login: login,
      message: messageText
    });
  }

  onChatMessageRecv(message) {
    this.socket.emit(events.server.GAME_CHAT_MESSAGE, message);
  }

  onDisconnect() {
    logger.info('DISCONNECT EVENT FIRED');
    RoomsController.unsubscribeOnUpdates(this.onRoomsUpdateCallback);
    if (this.roomId) {
      logger.info(`User ${this.id} leaves room ${this.roomId}`);
      RoomsController.leaveRoom(this.roomId, this.id);
    } 

    /* XXX: Handle disconnect if player is in game.
     */
  }

  _respondSuccess(data) {
    return Object.assign({ status: 'success' }, data);
  }

  _respondError(data) {
    return Object.assign({ status: 'error' }, data);
  }
}

module.exports = MainController;
