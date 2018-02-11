'use strict';
const logger = require("./logger");
const games = require("./models/Games");

module.exports = server => {
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    logger.info('New connection');
    //socket.on("getGames", socket.)

    socket.on('disconnect', () => logger.info('Connection closed'));
  });
};
