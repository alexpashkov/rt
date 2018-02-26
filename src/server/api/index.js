const gamesRouter = require("./games");
const apiRouter = require("express").Router();

apiRouter.use("/games", gamesRouter);

module.exports = apiRouter;
