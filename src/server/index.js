'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const logger = require('./logger');

// Read .env file to load environment variables:
require('dotenv').config({path: path.resolve(__dirname, '.env')});

// Try to get port number from environment variable, apply default if not specified:
const PORT = process.env.PORT || 3000;

io.on('connection', () => logger.info('New connection'));

// Configure serving of static files from public folder inside directory where this
// this file is located:
app.use(express.static(path.resolve(__dirname, 'public')));

// Start listening on a port:
app.listen(PORT, () => logger.info(`Server is listening on port ${PORT}`));
