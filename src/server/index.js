'use strict';

const app = require('express')();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
const logger = require('./logger');

require('dotenv').config({path: path.resolve(__dirname, '.env')});

io.on('connection', () => logger.info('New connection'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server is listening on port ${PORT}`));
