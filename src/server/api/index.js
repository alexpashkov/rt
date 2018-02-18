const apiRouter = require("express").Router();
const gamesRouter = require("express").Router();
const Game = require("../models/Game");
const games = require("../models/Games");

apiRouter.use("/games", gamesRouter);

gamesRouter
  .route("/")
  .get((req, res) => res.json(games.getAll()))
  .post((req, res) => {
    const game = games.createNew();
    res.json(game);
  });

module.exports = apiRouter;
