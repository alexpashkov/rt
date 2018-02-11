const logger = require('./logger');
const app = require('./app');
const server = require('http').Server(app);


//const apiRouter = require("./api");
//app.use("/api", apiRouter);

// Try to get port number from environment variable, apply default if not specified:
const PORT = process.env.PORT || 3000;
// Start listening on a port:
server.listen(PORT, () => logger.info(`Server is listening on port ${PORT}`));

module.exports = server;
