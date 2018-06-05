/* eslint react/prop-types: 0 */ // prop-types are set in the container component
import React from 'react';

const Game = ({ currentGameInfo }) => {
  return <pre>{JSON.stringify(currentGameInfo)}</pre>;
};

export default Game;
