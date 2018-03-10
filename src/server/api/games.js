const gamesService = require("../services/games");
const gamesRouter = require("express").Router();

gamesRouter
  .route("/")
  .post(createNewGame)
  .get(getAllGames);

function createNewGame(req, res) {
  gamesService
    .createNewGame()
    .then(game => res.json(game))
    .catch(() => res.sendStatus(500));
}

function getAllGames(req, res) {
  gamesService
    .getAllGames()
    .then(games => res.json(games))
    .catch(() => res.sendStatus(500));
}

module.exports = gamesRouter;
