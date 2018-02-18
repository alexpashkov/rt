'use strict';

const app = require("./app");
const server = require("http").Server(app);
global.io = require("socket.io")(server);
const logger = require("./logger");

require("./global-events");

// Try to get port number from environment variable,
// apply default if not specified:
require('./config');
const PORT = process.env.PORT || 3000;
// Start listening on a port:
server.listen(PORT, () => logger.info(`Server is listening on port ${PORT}`));
