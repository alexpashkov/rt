'use strict';

const logger = require('../logger');
const uniqid = require('uniqid');
const { EventEmitter } = require('events');
const Room = require('../models/Room');

/* RoomsController Events */
const RCEvents = {
  RC_ROOMS_UPDATED: 'RC_ROOMS_UPDATED'
};

class RoomsController extends EventEmitter {

  constructor() {
    super();
    this.setMaxListeners(50);
    this.rooms = {};
    this.logInterval = setInterval (() => {
      logger.debug(JSON.stringify(this.getRooms(), null ,'\t'));
    }, 3000);
  }

  createRoom() {
    const newRoom = new Room(uniqid(), { onDestroy: this.deleteRoom.bind(this) });
    this.rooms[newRoom.id] = newRoom;
    this.notifyRoomsListUpdated();
    return newRoom.id;
  }

  deleteRoom(roomId) {
    logger.info(`Deleting room ${roomId}`);
    if (this.rooms[roomId]) {
      delete this.rooms[roomId];
      this.notifyRoomsListUpdated();
    }
  }

  getRoomById(roomId) {
    return this.rooms[roomId];
  }

  getRooms() {
    return Object.values(this.rooms).map(room => room.getRoomInfo());
  }

  joinRoom(roomId, user) {
    if (!this.rooms[roomId] || !this.rooms[roomId].userJoin(user))
      return false;

    this.notifyRoomsListUpdated();
    return true;
  }

  leaveRoom(roomId, userId) {
    if (!this.rooms[roomId] || !this.rooms[roomId].userLeave(userId))
      return false;

    this.notifyRoomsListUpdated();
    return true;
  }

  chatMessageSend(roomId, message) {
    if (this.rooms[roomId]) {
      this.rooms[roomId].chatMessageSend(message);
    }
  }

  notifyRoomsListUpdated() {
    this.emit(RCEvents.RC_ROOMS_UPDATED, this.getRooms());
  }

  subscribeOnUpdates(callback) {
    this.on(RCEvents.RC_ROOMS_UPDATED, callback);
    callback(this.getRooms());
    logger.info(`Subscription on games update received. Listeners -> ${this.listenerCount(
      RCEvents.RC_ROOMS_UPDATED
    )}`);
  }

  unsubscribeOnUpdates(callback) {
    this.removeListener(RCEvents.RC_ROOMS_UPDATED, callback);
    logger.info(`Unsubscription on games update received. Listeners -> ${this.listenerCount(
      RCEvents.RC_ROOMS_UPDATED
    )}`);
  }
}

module.exports = new RoomsController();
