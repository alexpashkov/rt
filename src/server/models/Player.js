'use strict';
const rotationMap = require('../../shared/piece-rotation-map');
const validator = require('../../shared/validator');
const helpers = require('../../shared/helpers');
const blockCodes = require('../../shared/block-codes');
const assert = require('assert');
const logger = require('../logger');

const PlayerState = {
  IN_GAME: 1,
  HAS_LOST: 2,
  HAS_LEFT: 3,
  DISCONNECTED: 4,
};

class Player {
  constructor(id, handlers) {
    this.id = id;
    this.pieceIndex = 0;
    this.playerState = PlayerState.IN_GAME;
    this.validator = validator || (() => true);
    this.frozenIndex = 1;
    /*
     *  This 'handlers' thing is just a test.
     *  I thought there are too much event emitters and it makes
     *  code bad :(
     *
     * This thing seems to work ok.
     */
    this.handlers = handlers;
  }

  setBoard(board) {
    this.board = board;
    this.onBoardUpdate();
  }

  getBoard() {
    return this.board;
  }

  initCurrentPiece() {
    this.currentPiece = {
      code: this.handlers.getNewPiece(this.pieceIndex),
      x: Math.floor(Math.random() * Math.floor(this.board[0].length - 4)),
      y: -4
    };
    this.incrementPieceIndex();
    this.onCurrentPieceUpdate();
    this.setNextPiece(this.handlers.getNewPiece(this.pieceIndex + 1));
  }

  setCurrentPiece(currentPiece) {
    this.currentPiece = currentPiece;
    this.onCurrentPieceUpdate();
  }

  getCurrentPiece() {
    return this.currentPiece;
  }

  setNextPiece(_nextPiece) {
    this.nextPiece = _nextPiece;
    this.onNextPieceUpdate();
  }

  movePiece(movementDirection) {
    if (!this.canRespond())
      return false;

    assert(this.getCurrentPiece());

    if (typeof movementDirection === 'string') {
      movementDirection = helpers.stringToObjectDirection(movementDirection);
    }

    if (!this.validator(this.board, this.getCurrentPiece(), movementDirection))
    {
      /* 
       * There is the case where piece collides with the bottom of the map
       * and has to freeze. This has to be checked, even though the movement is invalid. 
       */
      if (movementDirection.x === 0 && movementDirection.y > 0) {
        this.applyPieceToBoard();
        this.checkPossiblyFilledLines();
        if (!this.checkHasLost()) {
          this.getNewPiece();
        } else {
          this.lost();
        }
      }
      return false;
    }

    this.currentPiece.x += movementDirection.x;
    this.currentPiece.y += movementDirection.y;

    this.onCurrentPieceUpdate();
    return true;
  }

  rotatePiece() {
    if (!this.canRespond())
      return false;

    assert(this.getCurrentPiece());

    const rotatedPiece = Object.assign({}, this.currentPiece, { code: rotationMap.get(this.currentPiece.code) });

    if (!this.validator(this.board, rotatedPiece, { x: 0, y: 0 }))
      return false;

    this.currentPiece.code = rotationMap.get(this.currentPiece.code);
    this.onCurrentPieceUpdate();
    return true;
  }

  dropPiece() {
    if (!this.canRespond())
      return false;

    assert(this.currentPiece);

    const _interval = setInterval(() => {
      if (!this.movePiece('down'))
        clearInterval(_interval);
    }, 20);
    return true;
  }

  getNewPiece() {
    this.setCurrentPiece(this.getNewCurrentPiece());
  }

  applyPieceToBoard() {
    const pieceArray = helpers.pieceToArray(this.currentPiece.code);

    for (let block of pieceArray) {
      if (this.currentPiece.y + block.y < 0)
        continue ;
      this.board[this.currentPiece.y + block.y][this.currentPiece.x + block.x] = this.currentPiece.code;
    }

    this.onBoardUpdate();
  }

  checkHasLost() {
    return (helpers.pieceToArray(this.currentPiece.code).some((piece) => {
      return (piece.y + this.currentPiece.y) < 0
    }));
  }

  checkPossiblyFilledLines() {
    let emptiedLineIndexes = [];

    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i].every(block =>
              block !== blockCodes.BLOCK_FREE && block !== blockCodes.BLOCK_LOCKED)) {
        emptiedLineIndexes.push(i);
      }
    }

    for (let emptyIndex of emptiedLineIndexes) {
      logger.error(`DISSOLVING LINE ${emptyIndex}`);
      this.dissolveLine(emptyIndex);
      this.handlers.onLineFilled &&
        this.handlers.onLineFilled({
          id: this.id,
          lineId: emptyIndex,
        });
    }

    if (emptiedLineIndexes.length) {
      this.onBoardUpdate();
    }
  }

  dissolveLine(lineIndex) {
    this.board[lineIndex] = this.board[lineIndex].map(() => blockCodes.BLOCK_FREE);
    for (let i = lineIndex - 1; i >= 0; i--) {
      this.board[i + 1] = this.board[i].slice();
    }
  }

  getNewCurrentPiece() {
    return {
      code: this.handlers.getNewPiece(this.pieceIndex++),
      x: Math.floor(Math.random() * Math.floor(this.board[0].length - 4)),
      y: -4
    }
  }

  setValidator(validator) {
    this.validator = validator;
  }

  getPieceIndex() {
    return this.pieceIndex;
  }

  canRespond() {
    return !(this.isDisconnected() || this.hasLost() || this.hasLeft());
  }

  isDisconnected() {
    return this.playerState === PlayerState.DISCONNECTED;
  }

  hasLost() {
    return this.playerState === PlayerState.HAS_LOST;
  }

  hasLeft() {
    return this.playerState === PlayerState.HAS_LEFT;
  }

  onCurrentPieceUpdate() {
    this.handlers.onCurrentPieceUpdate &&
      this.handlers.onCurrentPieceUpdate({
        id: this.id,
        piece: this.currentPiece
      });
  }

  onNextPieceUpdate() {
    this.handlers.onNextPieceUpdate &&
      this.handlers.onNextPieceUpdate({
        id: this.id,
        piece: this.nextPiece
      });
  }

  onBoardUpdate() {
    this.handlers.onBoardUpdate &&
      this.handlers.onBoardUpdate({
        id: this.id,
        board: this.board
      });
  }

  incrementPieceIndex() {
    this.pieceIndex++;
  }

  lost() {
    this.playerState = PlayerState.HAS_LOST;
    this.handlers.onPlayerLost &&
      this.handlers.onPlayerLost({
          id: this.id
      });
  }

  freezeLine() {
    logger.debug(`FREEZING LINE ${this.frozenIndex}`);
    for (let i = 0; i < this.board[0].length; i++) {
        this.board[this.board.length - this.frozenIndex][i] = blockCodes.BLOCK_LOCKED;
    }
    this.frozenIndex++;
    this.onBoardUpdate();
  }

  leave() {
    this.playerState = PlayerState.HAS_LEFT;
    this.handlers.onPlayerLeave &&
      this.handlers.onPlayerLeave({
          id: this.id
      });
  }

  disconnect() {
    this.playerState = PlayerState.DISCONNECTED;
    this.handlers.onDisconnect &&
      this.handlers.onDisconnect({
        id: this.id
      });
  }
}

module.exports = Player;
