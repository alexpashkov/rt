'use strict';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const logger = require('./logger');

require('./config');

io.on('connection', () => logger.info('New connection'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
