const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan")("tiny");

// app.use(morgan);
app.use(express.static(path.resolve(__dirname, "public")));
app.all("*", (_, res) => res.sendStatus(404));

module.exports = app;
