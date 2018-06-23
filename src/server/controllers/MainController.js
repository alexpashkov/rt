'use strict';

const logger = require('../logger');
const events = require('../../shared/socket-events.js');
const assert = require('assert');
const GamesController = require('./GamesController');
const UserService = require('../services/UserService');
const moveValidator = () => true;

class MainController {
  constructor(socket, userId) {
    this.socket = socket;
    this.id = userId;
    this.inGame = false;
    this.gameId = null;

    this.setupEventHandlers();

    /* This is created to perform unsubscription by function address */
    this.onGamesUpdateCallback = this.onGamesUpdate.bind(this);
    GamesController.subscribeUserOnGamesUpdate(this.onGamesUpdateCallback);

    socket.emit(events.server.USER_CONNECTED, {
      id: userId
    });
  }

  setupEventHandlers() {
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    this.socket.on(events.client.GAME_CREATE, this.onGameCreate.bind(this));
    this.socket.on(events.client.GAME_JOIN, this.onGameJoin.bind(this));
    this.socket.on(events.client.GAME_LEAVE, this.onGameLeave.bind(this));
    this.socket.on(events.client.GAME_START, this.onGameStartRequest.bind(this));
    this.socket.on(events.client.GAMES_UPDATE_REQUEST, this.onGamesUpdateRequest.bind(this));
    this.socket.on(events.client.GAME_CHAT_MESSAGE, this.onChatMessageSend.bind(this));
    this.socket.on(events.client.GAME_PIECE_MOVE, this.onGamePieceMove.bind(this));
    this.socket.on(events.client.GAME_PIECE_ROTATE, this.onGamePieceRotate.bind(this));
  }

  onGameCreate(callback) {
    if (this.inGame) {
      callback(this._respondError({ description: 'You are already in game.' }));
      return;
    }

    const gameId = GamesController.createGame();
    logger.info(`Created game ${gameId}`);
    callback(
      gameId
        ? this._respondSuccess({ gameId: gameId })
        : this._respondError({ description: 'Failed to create game.' })
    );
  }

  onGameJoin(data, callback) {
    logger.info(`Trying to join game ${data.id}`);

    if (this.inGame) {
      logger.info('Already in game.');
      callback(this._respondError({ description: 'Already in game.' }));
      return;
    }

    const { id } = data;
    const joined = GamesController.joinGame(id, this);
    let gameInfo = null;

    logger.info(`Joined game? -> ${joined}`);

    if (joined) {
      this.inGame = true;
      this.gameId = id;
      gameInfo = GamesController.getGameById(id).getGameInfo();
    }

    callback(
      joined
        ? this._respondSuccess({ gameInfo: gameInfo })
        : this._respondError({ description: 'Failed to join game.' })
    );
  }

  onGameLeave(data, callback) {
    const { id } = data;

    callback = callback || (() => {});

    logger.info(`User ${this.id} requested to leave game ${id}`);

    if (!this.inGame) {
      callback(this._respondError({ description: 'Not in game.' }));
      return;
    }

    if (GamesController.leaveGame(id, this.id)) {
      this.inGame = false;
      callback(this._respondSuccess());
    } else {
      callback(this._respondError({ description: 'Invalid game ID.' }));
    }
  }

  onGameStartRequest(callback) {
    logger.debug(`Request to start game. In game? [${this.inGame}]`);

    if (!this.inGame) {
      callback(this._respondError({ description: 'You are not in game.' }));
      return;
    } else if (!GamesController.gameExists(this.gameId)) {
      this.inGame = false;
      callback(
        this._respondError({ description: 'Your game has been destroyed.' })
      );
      return;
    } else if (GamesController.getGameById(this.gameId).hasStarted()) {
      callback(
        this._respondError({ description: 'Your game has already started.' })
      );
    }

    try {
      GamesController.getGameById(this.gameId).gameStart(this.id);
      callback(this._respondSuccess());
    } catch (_error) {
      logger.info(`Error: ${_error}`);
      callback(this._respondError({ description: _error }));
    }
  }

  onGameStarted() {
    this.socket.emit(events.server.GAME_STARTED);
  }

  onGamesUpdate(games) {
    logger.debug(`Emitting GAMES_UPDATE: ${games}`);
    this.socket.emit(events.server.GAMES_UPDATE, games);
  }

  onGameInfoUpdate(gameInfo) {
    this.socket.emit(events.server.GAME_INFO_UPDATE, gameInfo);
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

  onGamesUpdateRequest() {
    logger.debug('GAMES_UPDATE event requested.');
    this.onGamesUpdate(GamesController.getGames());
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
    if (!this.inGame) return;

    const login = UserService.getUserById(this.id).getLogin();
    const id = `${login}_${process.hrtime()}`;

    logger.debug(`Sending message with id ${id}`);

    GamesController.chatMessageSend(this.gameId, {
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
    GamesController.unsubscribeUserOnGamesUpdate(this.onGamesUpdateCallback);
    if (this.inGame) {
      logger.info(`User ${this.id} leaves game ${this.gameId}`);
      GamesController.leaveGame(this.gameId, this.id);
    } else {
      logger.info(`No game to leave for user ${this.id}`);
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
