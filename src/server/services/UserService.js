"use strict";

const uniqid = require("uniqid");
const Chance = require('Chance');
const chance = new Chance(uniqid());
const User = require("../models/User");

const namesUsed = [];
const uniqueName = () => {
  let name;

  do {
    name = `${chance.animal()} ${chance.name()}`;
  } while (namesUsed.includes(name));
  namesUsed.concat(name);
  return name;
};

class UserService {
  constructor() {
    this.users = {};
  }

  createUser() {
    const newUser = new User(uniqueName());
    this.users[newUser.id] = newUser;
    return newUser.id;
  }

  getUserById(id) {
    return this.users[id];
  }

  deleteUser(id) {
    const userToDelete = this.users[id];
    if (!userToDelete) return;
    delete this.users[id];
  }

}

module.exports = new UserService();
