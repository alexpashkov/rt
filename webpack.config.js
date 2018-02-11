const path = require("path");

module.exports = {
  entry: __dirname + "/src/client/index.js",
  output: {
    filename: "app.bundle.js",
    path: __dirname + "/src/server/public"
  }
};
