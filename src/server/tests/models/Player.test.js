'use strict';

describe('Player class', () => {

  xit('does not throw', () => {
    const player = new Player();
  });

  xit('successfully sets board', () => {
    const player = new Player();
    const board = [];

    player.setBoard(board);
    expect(player.getBoard()).toBe(board);
  });

});
