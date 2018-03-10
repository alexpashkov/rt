const gamesService = require("../services/games");
const gamesRouter = require("express").Router();

gamesRouter
  .route("/")
  .get(getAllGames)
  .post(createNewGame);

function getAllGames(req, res) {
  return res.json(gamesService.getAll());
}

function createNewGame(req, res) {
  return res.json(gamesService.createNew()) ;
}

module.exports = gamesRouter;
