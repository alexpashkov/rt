'use strict';

describe('Player class', () => {

  it('does not throw', () => {
    const player = new Player();
  });

  it('successfully sets board', () => {
    const player = new Player();
    const board = [];

    player.setBoard(board):
    expect(player.getBoard()).toBe(board);
  });

});
