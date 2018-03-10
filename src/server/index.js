"use strict";
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = require("./app");
const server = require("http").Server(app);
const logger = require("./logger");

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => logger.info(`Server is listening on port ${PORT}`));

require("./global-events")(server);
