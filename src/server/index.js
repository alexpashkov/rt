"use strict";

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = require("./app");
const server = require("http").Server(app);
const logger = require("./logger");

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => logger.debug(`Server is listening on port ${PORT}`));
}

require("./controllers/ServerController")(server);

module.exports = () => true;