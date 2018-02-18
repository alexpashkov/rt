'use strict';
const logger = require("./logger");
const games = require("./models/Games");
const Game = require("./models/Game");

module.exports = server => {
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    logger.info('New connection');
    debugger;
    socket.on('GAME_INIT', (...args) => {
      console.log('GAME_INIT');
      // const newGame = new Game();
      // games.addGame(newGame);
      // socket.join(newGame.id);
    });
    socket.on('GAME_JOIN', (id, ...rest) => {
      console.log("Game join");
      // socket.join(id);
    });
    socket.on('GAME_LEAVE', (id, ...rest) => {
      console.log("Game leave");
      // socket.leave(id);
    });
    socket.on('disconnect', () => logger.info('Connection closed'));
  });
};
