const router = require("express").Router();
const games = require("../models/Games");

router.get("/games", (_, res) => res.json(games.getGames()));

module.exports = router;
