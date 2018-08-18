const app = require("../../app");
const server = require("http").Server(app);
const ServerControllerFactory = require("../../controllers/ServerController");
const UserService = require('../../services/UserService');

describe("ServerController", () => {

    const ServerController = ServerControllerFactory(server);

    const socket = {
        on: () => true,
        emit: () => true,
        handshake: { query: {} }
    };

    it("ServerController succesfully instantiates with server", () => {
        expect(ServerController).toBeTruthy();
    });

    it("processes new connection without throwing", () => {
        expect(ServerController.onConnection(socket)).toBeUndefined();
    });

    it("processes new connection with valid id without throwing", () => {
        const id = UserService.createUser();
        expect(ServerController.onConnection(socket, id)).toBeUndefined();
    });

    it("processes new connection with invalid id without throwing", () => {
        expect(ServerController.onConnection(socket, 'invalid')).toBeUndefined();
    });
});
