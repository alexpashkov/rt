const games = require("../models/games");

const gamesRouter = require("express").Router();

gamesRouter
  .route("/")
  .get((req, res) => res.json(games.getAll()))
  .post((req, res) => res.json(games.createNew()));

module.exports = gamesRouter;
