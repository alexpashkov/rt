const Player = require('../../models/Player');

describe('Player class', () => {

  it('does not throw', () => {
    new Player('1', {});
  });

  it('successfully sets board', () => {
    const player = new Player('1', {});
    const board = [];

    player.setBoard(board);
    expect(player.getBoard()).toBe(board);
  });

});