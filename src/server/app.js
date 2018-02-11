const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan')('tiny');

// Log HTTP requests:
app.use(morgan);
// Configure serving of static files:
app.use(express.static(path.resolve(__dirname, 'public')));
// Handle /api routes:
app.use("/api", require("./api"));
// Send 404 for any other router:
app.all("*", (_, res) => res.sendStatus(404)); 

module.exports = app;
