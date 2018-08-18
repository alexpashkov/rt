const GameMode = require('../../models/GameMode');

let gameMode;
describe('GameMod', () => {
  beforeEach(() => {
    gameMode = new GameMode(null);
  });
  test("methods that are supposed to be implemented throw an exception", () => {
    expect(() => gameMode.update()).toThrow();
    expect(() => gameMode.beforeStart()).toThrow();
    expect(() => gameMode.afterFinish()).toThrow();
  });
  test("unsetUpdateLoop", () => {
    gameMode.setUpdateLoop();
    gameMode.unsetUpdateLoop();
    expect(gameMode.updateLoopInterval).toBeNull();
  });
  test("unsetUpdateLoop does nothing if there is not updateLoopInterval", () => {
    gameMode.unsetUpdateLoop();
    expect(gameMode.updateLoopInterval).toBeUndefined();
  });

  it("doesn't start if there is updateLoopInterval", () => {
    const params = {};
    gameMode.beforeStart = jest.fn();
    gameMode.setUpdateLoop = jest.fn();
    gameMode.updateLoopInterval = true;
    gameMode.start(params);
    expect(gameMode.params).toBeUndefined();
    expect(gameMode.beforeStart).not.toHaveBeenCalled();
    expect(gameMode.setUpdateLoop).not.toHaveBeenCalled();
  });
  it("start", () => {
    const params = {};
    gameMode.beforeStart = jest.fn();
    gameMode.setUpdateLoop = jest.fn();
    gameMode.start(params);
    expect(gameMode.params).toBe(params);
    expect(gameMode.beforeStart).toHaveBeenCalled();
    expect(gameMode.setUpdateLoop).toHaveBeenCalled();
  });
  test("finish", () => {
    gameMode.unsetUpdateLoop = jest.fn();
    gameMode.afterFinish = jest.fn();
    gameMode.finish();
    expect(gameMode.unsetUpdateLoop).toHaveBeenCalled();
    expect(gameMode.afterFinish).toHaveBeenCalled();
  });
});
