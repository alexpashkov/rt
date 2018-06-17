"use strict";

const { EventEmitter } = require("events");
const Room = require("../models/Room");

const RCEvents = {
  ROOM_LIST_UPDATE: "ROOM_LIST_UPDATE",
};

class RoomsController extends EventEmitter {
  constructor() {
    super();
    this.rooms = [];
  }

  createRoom() {
    const room = new Room(uniqid());
    this.rooms[room.id] = room;

    room.onDestroy(this.deleteRoom.bind(this));
    this.notifyRoomsUpdated();
  }

  joinRoom(roomId, user) {
    if (this.rooms[roomId] && this.rooms[roomId].playerJoin(user)) {
      this.notifyRoomsUpdated();
      return true;
    }
    return false;
  }

  leaveRoom(roomId, userId) {
    if (this.rooms[roomId] && this.rooms[roomId].playerLeave(userId)) {
      this.notifyRoomsUpdated();
      return true;
    }
    return false;
  }

  chatMessageSend(roomId, message) {
    if (this.rooms[roomId])
      this.rooms[roomId].chatMessageSend(message);
  }

  roomExists(roomId) {
    return !!this.rooms[roomId];
  }

  deleteRoom(roomId) {
    this.rooms[roomId] = null;
  }

  getRooms() {
    return Object.values(this.rooms).map(room => room.getRoomInfo());
  }

  notifyRoomsUpdated() {
    this.emit(RCEvents.ROOM_LIST_UPDATE, this.getRooms());
  }
};
