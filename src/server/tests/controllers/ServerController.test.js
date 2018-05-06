const app = require("../../app");
const server = require("http").Server(app);
const ServerControllerFactory = require("../../controllers/ServerController");

test("ServerController succesfully instantiates with server", () => {
  expect(ServerControllerFactory(server)).toBeTruthy();
});
