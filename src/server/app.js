const express = require('express');
const app = express();
const path = require('path');

// Configure serving of static files from public folder inside directory where this
// this file is located:
app.use(express.static(path.resolve(__dirname, 'public')));

module.exports = app;
