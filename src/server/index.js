'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
const logger = require('./logger');

require('dotenv').config({path: path.resolve(__dirname, '.env')});

const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'public')));
app.listen(PORT, () => logger.info(`Server is listening on port ${PORT}`));
