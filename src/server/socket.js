'use strict';
const logger = require("./logger");

module.exports = server => {
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    logger.info('New connection');
    socket.on('disconnect', () => logger.info('Connection closed'));
  });
};
