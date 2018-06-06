const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

const PATH_TO_PUBLIC = path.resolve(__dirname, 'public');
const INDEX_HTML_FILE_STRING = fs
  .readFileSync(path.resolve(PATH_TO_PUBLIC, 'index.html'))
  .toString();

app.use(express.static(PATH_TO_PUBLIC));
app.all('*', (_, res) => res.type('html').end(INDEX_HTML_FILE_STRING));

module.exports = app;
