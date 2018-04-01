const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.resolve(__dirname, "public")));
app.all("*", (_, res) => res.sendStatus(404));

module.exports = app;
