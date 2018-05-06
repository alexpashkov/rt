"use strict";

const uniqid = require("uniqid");
const User = require("../models/User");

class UserService {
  constructor() {
    this.users = {};
  }

  createUser() {
    const newUser = new User(uniqid());
    this.users[newUser.id] = newUser;
    return newUser.id;
  }

  getUserById(id) {
    return this.users[id];
  }

  notifyDisconnected(userId) {
  }

  deleteUser(id) {
    const userToDelete = this.users[id];
    if (!userToDelete) return;
    delete this.users[id];
  }

}

module.exports = new UserService();
