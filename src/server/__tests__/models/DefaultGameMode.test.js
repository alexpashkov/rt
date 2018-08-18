const DefaultGameMode = require("../../models/DefaultGameMode");
const Game = require("../../models/Game");
const MainController = require("../../controllers/MainController");
const SocketIOMock = require("socket.io-mock");
const pieceCodes = require("../../../shared/piece-codes.js");
const R = require("ramda");

const playerControllers = [
  new MainController(new SocketIOMock(), 0),
  new MainController(new SocketIOMock(), 1)
];

let gameMode;

describe("DefaultGameMode", () => {
  beforeEach(() => {
    gameMode = new DefaultGameMode(
      new Game(0, playerControllers, null),
      playerControllers
    );
  });

  test("update doesn't throw", () => {
    gameMode.update();
  });
  test("beforStart and afterFinish", () => {
    gameMode.beforeStart();
    gameMode.afterFinish();
  });
  test("generatePlayerBoards", () => {
    gameMode.generatePlayerBoards();
    const defaultBoard = DefaultGameMode.getDefaultBoard();

    for (let player of gameMode.game.getPlayers()) {
      expect(player.getBoard()).toEqual(defaultBoard)
    }
  });
  test("getNewPiece", () => {
    expect(pieceCodes.includes(gameMode.getNewPiece(0))).toBeTruthy()
  });
  test("generateInitialPieces", () => {
    gameMode.game.getPlayers().forEach(player => {
      expect(player.getCurrentPiece()).toBeFalsy();
    });
    gameMode.generatePlayerBoards();
    gameMode.generateInitialPieces();

    gameMode.game.getPlayers().forEach(player => {
      expect(player.getCurrentPiece()).toBeTruthy();
    });
  });
  test("onPlayerLineFilled", () => {
    gameMode.generatePlayerBoards();
    gameMode.game.onPlayerLineFilled = jest.fn();
    const initialPlayers = R.clone(gameMode.game.getPlayers());
    const {id: frozerId, frozenIndex: frozerFrozenIndex = 1} = initialPlayers[0].id;
    gameMode.onPlayerLineFilled({id: frozerId});
    gameMode.game.getPlayers().forEach(player => {
      expect(player.frozenIndex)
        .toBe(
          player.id === frozerId
            ? frozerFrozenIndex
            : frozerFrozenIndex + 1)
    })
  });
  test("onPlayerBoardUpdate calls onPlayerBordUpdate on this.game", () => {
    const test = {};
    gameMode.game.onPlayerBoardUpdate = jest.fn();
    gameMode.onPlayerBoardUpdate(test);
    expect(gameMode.game.onPlayerBoardUpdate).toHaveBeenCalledWith(test)
  });
  test("onPlayerPieceUpdate calls onPlayerBordUpdate on this.game", () => {
    const test = {};
    gameMode.game.onPlayerPieceUpdate = jest.fn();
    gameMode.onPlayerPieceUpdate(test);
    expect(gameMode.game.onPlayerPieceUpdate).toHaveBeenCalledWith(test)
  });
  test("onPlayerNextPieceUpdate calls onPlayerNextPieceUpdate on this.game", () => {
    const test = {};
    gameMode.game.onPlayerNextPieceUpdate = jest.fn();
    gameMode.onPlayerNextPieceUpdate(test);
    expect(gameMode.game.onPlayerNextPieceUpdate).toHaveBeenCalledWith(test)
  });
  test("onPlayerLost calls onPlayerLost on this.game", () => {
    const test = {};
    gameMode.game.onPlayerLost = jest.fn();
    gameMode.onPlayerLost(test);
    expect(gameMode.game.onPlayerLost).toHaveBeenCalledWith(test)
  });
  test("onPlayerLeave calls onPlayerLeave on this.game", () => {
    const test = {};
    gameMode.game.onPlayerLeave = jest.fn();
    gameMode.onPlayerLeave(test);
    expect(gameMode.game.onPlayerLeave).toHaveBeenCalledWith(test)
  });
  test("onPlayerDisconnect calls onPlayerDisconnect on this.game", () => {
    const test = {};
    gameMode.game.onPlayerDisconnect = jest.fn();
    gameMode.onPlayerDisconnect(test);
    expect(gameMode.game.onPlayerDisconnect).toHaveBeenCalledWith(test)
  });
});