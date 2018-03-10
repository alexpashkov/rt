const gamesService = require("../services/games");
const gamesRouter = require("express").Router();

gamesRouter
  .route("/")
  .post(createNewGame)
  .get(getAllGames);

gamesRouter.get("/:id", getGame);

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

function getGame({ params: { id } }, res) {
  gamesService
    .getGame(id)
    .then(
      game =>
        game ? res.json(game) : res.status(404).send("Game doesn't exist")
    );
}

module.exports = gamesRouter;
