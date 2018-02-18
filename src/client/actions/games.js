export const types = {
  GAMES_SET: 'GAMES_SET',
};

export const gamesSet = games => ({type: types.GAMES_SET, payload: games});
