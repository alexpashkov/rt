import React from 'react';
import gamePropTypes from './gamePropTypes';

const Game = ({ currentGameInfo }) => {
  return <pre>{JSON.stringify(currentGameInfo)}</pre>;
};

Game.propTypes = gamePropTypes;

export default Game;
